# GIS File Converter
### Modern GIS File Converter based on GDAL/OGR

A modern, user-friendly web application for converting geospatial files between various formats. Built with React and Python FastAPI, powered by GDAL/OGR.

### Features

- **Modern Interface**: Clean, intuitive UI with drag-and-drop file upload
- **Vector Support**: Convert between GeoJSON, Shapefile, GeoPackage, KML, GPX, GML, DXF, CSV
- **Raster Support**: Convert between GeoTIFF, PNG, JPEG, Erdas Imagine, ASCII Grid, NetCDF
- **Multilingual**: Full support for English, French, and Spanish
- **User-Friendly**: Clear messages and guidance for non-GIS experts
- **Automatic Detection**: Automatically detects whether your file is vector or raster
- **Easy Deployment**: Docker-based setup for quick installation

### Supported Formats

#### Vector Formats
- GeoJSON (.geojson)
- Shapefile (.shp)
- GeoPackage (.gpkg)
- KML (.kml)
- GPX (.gpx)
- GML (.gml)
- AutoCAD DXF (.dxf)
- CSV (.csv)

#### Raster Formats
- GeoTIFF (.tif)
- PNG (.png)
- JPEG (.jpg)
- Erdas Imagine (.img)
- Arc/Info ASCII Grid (.asc)
- XYZ ASCII Grid (.xyz)
- NetCDF (.nc)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/calysteau/geoconverter.git
   cd geoconverter
   ```

2. **Start the application**
   ```bash
   docker compose up -d
   ```

3. **Access the application**
   Open your browser and go to: http://localhost

### Manual Installation

#### Backend

1. **Install GDAL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install gdal-bin libgdal-dev python3-gdal

   # macOS
   brew install gdal
   ```

2. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Run the backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. **Install Node.js dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   Open your browser and go to: http://localhost:5173

### Usage

1. **Select a File**: Drag and drop or browse to select your GIS file
2. **Choose Format**: Select the desired output format (vector or raster)
3. **Convert**: Click the convert button and wait for processing
4. **Download**: Download your converted file

### Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, react-i18next
- **Backend**: Python FastAPI, GDAL/OGR
- **Deployment**: Docker, Docker Compose, Nginx

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

See LICENSE file for details.

## Screenshots / Captures d'écran / Capturas de pantalla

The application features a clean, modern interface with:
- Drag and drop file upload
- Clear format selection for vector and raster data
- Real-time conversion progress
- Multilingual support (EN, FR, ES)

## Support

For issues, questions, or contributions, please open an issue on GitHub.
