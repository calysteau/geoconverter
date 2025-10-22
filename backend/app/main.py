from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import uuid
import shutil
from pathlib import Path
from typing import Optional
from app.converter import GISConverter
from app.i18n import get_message

app = FastAPI(title="GIS File Converter", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
UPLOAD_DIR = Path("/tmp/gis_uploads")
OUTPUT_DIR = Path("/tmp/gis_outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

converter = GISConverter()

@app.get("/")
async def root():
    return {"message": "GIS File Converter API", "version": "1.0.0"}

@app.get("/api/formats")
async def get_supported_formats(lang: str = "en"):
    """Get list of supported input and output formats"""
    return {
        "vector": converter.get_vector_formats(),
        "raster": converter.get_raster_formats()
    }

@app.post("/api/detect")
async def detect_file_type(
    file: UploadFile = File(...),
    lang: str = Form("en")
):
    """Detect if uploaded file is vector or raster"""

    # Generate unique ID for this detection
    job_id = str(uuid.uuid4())

    # Save uploaded file temporarily
    input_path = UPLOAD_DIR / f"{job_id}_{file.filename}"
    try:
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=get_message("upload_failed", lang)
        )

    try:
        # Detect file type
        file_type = converter.detect_file_type(str(input_path))

        if file_type == "unknown":
            raise HTTPException(
                status_code=400,
                detail=get_message("unknown_file_type", lang)
            )

        return {
            "success": True,
            "file_type": file_type,
            "message": get_message(f"file_detected_{file_type}", lang),
            "filename": file.filename
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{get_message('unknown_error', lang)}: {str(e)}"
        )
    finally:
        # Clean up temporary file
        if input_path.exists():
            input_path.unlink()

@app.post("/api/convert")
async def convert_file(
    file: UploadFile = File(...),
    output_format: str = Form(...),
    lang: str = Form("en")
):
    """Convert uploaded GIS file to specified format"""

    # Generate unique ID for this conversion
    job_id = str(uuid.uuid4())

    # Save uploaded file
    input_path = UPLOAD_DIR / f"{job_id}_{file.filename}"
    try:
        with open(input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=get_message("upload_failed", lang)
        )

    # Determine output filename
    output_filename = f"{Path(file.filename).stem}.{output_format.lower()}"
    output_path = OUTPUT_DIR / f"{job_id}_{output_filename}"

    # Perform conversion
    try:
        result = converter.convert(
            str(input_path),
            str(output_path),
            output_format,
            lang
        )

        if not result["success"]:
            raise HTTPException(
                status_code=400,
                detail=result["message"]
            )

        # Return file info
        return {
            "success": True,
            "message": get_message("conversion_success", lang),
            "download_url": f"/api/download/{job_id}_{output_filename}",
            "filename": output_filename,
            "input_type": result["input_type"],
            "output_format": output_format
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{get_message('conversion_failed', lang)}: {str(e)}"
        )
    finally:
        # Clean up input file
        if input_path.exists():
            input_path.unlink()

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """Download converted file"""
    file_path = OUTPUT_DIR / filename

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        filename=filename.split("_", 1)[1],  # Remove job_id prefix
        media_type="application/octet-stream"
    )

@app.delete("/api/cleanup/{filename}")
async def cleanup_file(filename: str):
    """Clean up converted file after download"""
    file_path = OUTPUT_DIR / filename

    if file_path.exists():
        file_path.unlink()
        return {"success": True, "message": "File deleted"}

    return {"success": False, "message": "File not found"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "gdal_available": converter.check_gdal_available()
    }
