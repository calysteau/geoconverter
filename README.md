# GIS File Converter / Convertisseur de fichiers SIG / Conversor de archivos SIG

[English](#english) | [Français](#français) | [Español](#español)

---

## English

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
   git clone <repository-url>
   cd geoconverter
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
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

---

## Français

### Convertisseur de fichiers SIG moderne basé sur GDAL/OGR

Une application web moderne et conviviale pour convertir des fichiers géospatiaux entre différents formats. Construite avec React et Python FastAPI, propulsée par GDAL/OGR.

### Fonctionnalités

- **Interface Moderne**: Interface utilisateur claire et intuitive avec glisser-déposer
- **Support Vectoriel**: Conversion entre GeoJSON, Shapefile, GeoPackage, KML, GPX, GML, DXF, CSV
- **Support Raster**: Conversion entre GeoTIFF, PNG, JPEG, Erdas Imagine, ASCII Grid, NetCDF
- **Multilingue**: Support complet pour l'anglais, le français et l'espagnol
- **Convivial**: Messages clairs et guidage pour les non-experts SIG
- **Détection Automatique**: Détecte automatiquement si votre fichier est vectoriel ou raster
- **Déploiement Facile**: Configuration Docker pour une installation rapide

### Démarrage Rapide avec Docker

1. **Cloner le dépôt**
   ```bash
   git clone <repository-url>
   cd geoconverter
   ```

2. **Démarrer l'application**
   ```bash
   docker-compose up -d
   ```

3. **Accéder à l'application**
   Ouvrez votre navigateur et allez à: http://localhost

### Installation Manuelle

#### Backend

1. **Installer GDAL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install gdal-bin libgdal-dev python3-gdal

   # macOS
   brew install gdal
   ```

2. **Installer les dépendances Python**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Lancer le backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. **Installer les dépendances Node.js**
   ```bash
   cd frontend
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Accéder à l'application**
   Ouvrez votre navigateur et allez à: http://localhost:5173

### Utilisation

1. **Sélectionner un Fichier**: Glissez-déposez ou parcourez pour sélectionner votre fichier SIG
2. **Choisir le Format**: Sélectionnez le format de sortie souhaité (vectoriel ou raster)
3. **Convertir**: Cliquez sur le bouton de conversion et attendez le traitement
4. **Télécharger**: Téléchargez votre fichier converti

---

## Español

### Conversor de archivos SIG moderno basado en GDAL/OGR

Una aplicación web moderna y fácil de usar para convertir archivos geoespaciales entre varios formatos. Construida con React y Python FastAPI, impulsada por GDAL/OGR.

### Características

- **Interfaz Moderna**: UI clara e intuitiva con carga de archivos por arrastrar y soltar
- **Soporte Vectorial**: Conversión entre GeoJSON, Shapefile, GeoPackage, KML, GPX, GML, DXF, CSV
- **Soporte Ráster**: Conversión entre GeoTIFF, PNG, JPEG, Erdas Imagine, ASCII Grid, NetCDF
- **Multilingüe**: Soporte completo para inglés, francés y español
- **Fácil de Usar**: Mensajes claros y orientación para no expertos en SIG
- **Detección Automática**: Detecta automáticamente si su archivo es vectorial o ráster
- **Implementación Fácil**: Configuración basada en Docker para instalación rápida

### Inicio Rápido con Docker

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd geoconverter
   ```

2. **Iniciar la aplicación**
   ```bash
   docker-compose up -d
   ```

3. **Acceder a la aplicación**
   Abra su navegador y vaya a: http://localhost

### Instalación Manual

#### Backend

1. **Instalar GDAL**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install gdal-bin libgdal-dev python3-gdal

   # macOS
   brew install gdal
   ```

2. **Instalar dependencias de Python**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Ejecutar el backend**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend

1. **Instalar dependencias de Node.js**
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación**
   Abra su navegador y vaya a: http://localhost:5173

### Uso

1. **Seleccionar un Archivo**: Arrastre y suelte o busque para seleccionar su archivo SIG
2. **Elegir Formato**: Seleccione el formato de salida deseado (vectorial o ráster)
3. **Convertir**: Haga clic en el botón de conversión y espere el procesamiento
4. **Descargar**: Descargue su archivo convertido

---

## Screenshots / Captures d'écran / Capturas de pantalla

The application features a clean, modern interface with:
- Drag and drop file upload
- Clear format selection for vector and raster data
- Real-time conversion progress
- Multilingual support (EN, FR, ES)

## Support

For issues, questions, or contributions, please open an issue on GitHub.
