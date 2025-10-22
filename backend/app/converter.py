from osgeo import gdal, ogr
import os
from pathlib import Path
from typing import Dict, List
from app.i18n import get_message

# Enable exceptions
gdal.UseExceptions()
ogr.UseExceptions()

class GISConverter:
    """Main class for GIS file conversion using GDAL/OGR"""

    # Supported formats
    VECTOR_FORMATS = {
        "geojson": {"driver": "GeoJSON", "extension": "geojson", "name": "GeoJSON"},
        "shp": {"driver": "ESRI Shapefile", "extension": "shp", "name": "Shapefile"},
        "gpkg": {"driver": "GPKG", "extension": "gpkg", "name": "GeoPackage"},
        "kml": {"driver": "KML", "extension": "kml", "name": "KML"},
        "dxf": {"driver": "DXF", "extension": "dxf", "name": "AutoCAD DXF"},
        "gml": {"driver": "GML", "extension": "gml", "name": "GML"},
        "csv": {"driver": "CSV", "extension": "csv", "name": "CSV"},
        "gpx": {"driver": "GPX", "extension": "gpx", "name": "GPX"},
    }

    RASTER_FORMATS = {
        "tif": {"driver": "GTiff", "extension": "tif", "name": "GeoTIFF"},
        "png": {"driver": "PNG", "extension": "png", "name": "PNG"},
        "jpg": {"driver": "JPEG", "extension": "jpg", "name": "JPEG"},
        "hfa": {"driver": "HFA", "extension": "img", "name": "Erdas Imagine"},
        "asc": {"driver": "AAIGrid", "extension": "asc", "name": "Arc/Info ASCII Grid"},
        "xyz": {"driver": "XYZ", "extension": "xyz", "name": "XYZ ASCII Grid"},
        "nc": {"driver": "netCDF", "extension": "nc", "name": "NetCDF"},
    }

    def __init__(self):
        """Initialize converter"""
        pass

    def check_gdal_available(self) -> bool:
        """Check if GDAL is available"""
        try:
            version = gdal.VersionInfo()
            return True
        except:
            return False

    def get_vector_formats(self) -> List[Dict]:
        """Get list of supported vector formats"""
        return [
            {"code": code, "name": info["name"], "extension": info["extension"]}
            for code, info in self.VECTOR_FORMATS.items()
        ]

    def get_raster_formats(self) -> List[Dict]:
        """Get list of supported raster formats"""
        return [
            {"code": code, "name": info["name"], "extension": info["extension"]}
            for code, info in self.RASTER_FORMATS.items()
        ]

    def detect_file_type(self, input_path: str) -> str:
        """Detect if file is vector or raster"""
        # Try to open as vector
        try:
            ds = ogr.Open(input_path)
            if ds is not None:
                ds = None
                return "vector"
        except:
            pass

        # Try to open as raster
        try:
            ds = gdal.Open(input_path)
            if ds is not None:
                ds = None
                return "raster"
        except:
            pass

        return "unknown"

    def convert_vector(self, input_path: str, output_path: str, output_format: str, lang: str = "en") -> Dict:
        """Convert vector file"""
        try:
            # Open input
            input_ds = ogr.Open(input_path)
            if input_ds is None:
                return {
                    "success": False,
                    "message": get_message("invalid_input_file", lang)
                }

            # Get format info
            format_info = self.VECTOR_FORMATS.get(output_format.lower())
            if not format_info:
                return {
                    "success": False,
                    "message": get_message("unsupported_format", lang)
                }

            # Get driver
            driver = ogr.GetDriverByName(format_info["driver"])
            if driver is None:
                return {
                    "success": False,
                    "message": get_message("driver_not_available", lang).format(format_info["driver"])
                }

            # Remove output if exists
            if os.path.exists(output_path):
                driver.DeleteDataSource(output_path)

            # Create output
            output_ds = driver.CreateDataSource(output_path)
            if output_ds is None:
                return {
                    "success": False,
                    "message": get_message("create_output_failed", lang)
                }

            # Copy all layers
            for layer_idx in range(input_ds.GetLayerCount()):
                input_layer = input_ds.GetLayerByIndex(layer_idx)
                layer_name = input_layer.GetName()

                # Create output layer
                output_layer = output_ds.CopyLayer(input_layer, layer_name)
                if output_layer is None:
                    return {
                        "success": False,
                        "message": get_message("copy_layer_failed", lang)
                    }

            # Close datasets
            input_ds = None
            output_ds = None

            return {
                "success": True,
                "message": get_message("conversion_success", lang),
                "input_type": "vector"
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"{get_message('conversion_failed', lang)}: {str(e)}"
            }

    def convert_raster(self, input_path: str, output_path: str, output_format: str, lang: str = "en") -> Dict:
        """Convert raster file"""
        try:
            # Open input
            input_ds = gdal.Open(input_path)
            if input_ds is None:
                return {
                    "success": False,
                    "message": get_message("invalid_input_file", lang)
                }

            # Get format info
            format_info = self.RASTER_FORMATS.get(output_format.lower())
            if not format_info:
                return {
                    "success": False,
                    "message": get_message("unsupported_format", lang)
                }

            # Get driver
            driver = gdal.GetDriverByName(format_info["driver"])
            if driver is None:
                return {
                    "success": False,
                    "message": get_message("driver_not_available", lang).format(format_info["driver"])
                }

            # Translate (convert)
            options = []
            if output_format.lower() == "jpg":
                options = ["-of", "JPEG"]
            elif output_format.lower() == "png":
                options = ["-of", "PNG"]

            output_ds = gdal.Translate(output_path, input_ds, format=format_info["driver"])

            if output_ds is None:
                return {
                    "success": False,
                    "message": get_message("create_output_failed", lang)
                }

            # Close datasets
            input_ds = None
            output_ds = None

            return {
                "success": True,
                "message": get_message("conversion_success", lang),
                "input_type": "raster"
            }

        except Exception as e:
            return {
                "success": False,
                "message": f"{get_message('conversion_failed', lang)}: {str(e)}"
            }

    def convert(self, input_path: str, output_path: str, output_format: str, lang: str = "en") -> Dict:
        """Main conversion method"""
        # Detect file type
        file_type = self.detect_file_type(input_path)

        if file_type == "unknown":
            return {
                "success": False,
                "message": get_message("unknown_file_type", lang)
            }

        # Check if output format matches file type
        output_format_lower = output_format.lower()

        if file_type == "vector":
            if output_format_lower not in self.VECTOR_FORMATS:
                return {
                    "success": False,
                    "message": get_message("format_mismatch_vector", lang)
                }
            return self.convert_vector(input_path, output_path, output_format, lang)

        elif file_type == "raster":
            if output_format_lower not in self.RASTER_FORMATS:
                return {
                    "success": False,
                    "message": get_message("format_mismatch_raster", lang)
                }
            return self.convert_raster(input_path, output_path, output_format, lang)

        return {
            "success": False,
            "message": get_message("unknown_error", lang)
        }
