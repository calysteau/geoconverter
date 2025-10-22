import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "GIS File Converter",
      subtitle: "Convert your geospatial files easily",
      step1: "Step 1: Select your file",
      step2: "Step 2: Choose output format",
      step3: "Step 3: Convert",
      dragDrop: "Drag and drop your file here",
      or: "or",
      browse: "Browse files",
      fileSelected: "File selected",
      selectFormat: "Select output format",
      vectorFormats: "Vector Formats",
      rasterFormats: "Raster Formats",
      convert: "Convert File",
      converting: "Converting...",
      downloadReady: "Your file is ready!",
      download: "Download",
      convertAnother: "Convert Another File",
      error: "Error",
      vectorDesc: "Point, line, and polygon data (e.g., shapefiles, GeoJSON)",
      rasterDesc: "Grid-based data (e.g., satellite imagery, DEMs)",
      selectFormatFirst: "Please select an output format",
      selectFileFirst: "Please select a file first",
      conversionSuccess: "Conversion successful!",
      conversionError: "An error occurred during conversion",
      supportedFormats: "Supported file types: Shapefile, GeoJSON, GeoTIFF, KML, GPX, and more",
      language: "Language",
      autoDetect: "The file type is automatically detected",
      chooseCompatible: "Choose a compatible format based on your data type",
    }
  },
  fr: {
    translation: {
      title: "Convertisseur de fichiers SIG",
      subtitle: "Convertissez facilement vos fichiers géospatiaux",
      step1: "Étape 1 : Sélectionnez votre fichier",
      step2: "Étape 2 : Choisissez le format de sortie",
      step3: "Étape 3 : Convertir",
      dragDrop: "Glissez-déposez votre fichier ici",
      or: "ou",
      browse: "Parcourir les fichiers",
      fileSelected: "Fichier sélectionné",
      selectFormat: "Sélectionner le format de sortie",
      vectorFormats: "Formats Vectoriels",
      rasterFormats: "Formats Raster",
      convert: "Convertir le fichier",
      converting: "Conversion en cours...",
      downloadReady: "Votre fichier est prêt !",
      download: "Télécharger",
      convertAnother: "Convertir un autre fichier",
      error: "Erreur",
      vectorDesc: "Données de points, lignes et polygones (ex: shapefiles, GeoJSON)",
      rasterDesc: "Données matricielles (ex: imagerie satellite, MNT)",
      selectFormatFirst: "Veuillez sélectionner un format de sortie",
      selectFileFirst: "Veuillez d'abord sélectionner un fichier",
      conversionSuccess: "Conversion réussie !",
      conversionError: "Une erreur s'est produite lors de la conversion",
      supportedFormats: "Types de fichiers pris en charge : Shapefile, GeoJSON, GeoTIFF, KML, GPX, et plus",
      language: "Langue",
      autoDetect: "Le type de fichier est automatiquement détecté",
      chooseCompatible: "Choisissez un format compatible selon votre type de données",
    }
  },
  es: {
    translation: {
      title: "Conversor de archivos SIG",
      subtitle: "Convierta sus archivos geoespaciales fácilmente",
      step1: "Paso 1: Seleccione su archivo",
      step2: "Paso 2: Elija el formato de salida",
      step3: "Paso 3: Convertir",
      dragDrop: "Arrastre y suelte su archivo aquí",
      or: "o",
      browse: "Examinar archivos",
      fileSelected: "Archivo seleccionado",
      selectFormat: "Seleccionar formato de salida",
      vectorFormats: "Formatos Vectoriales",
      rasterFormats: "Formatos Ráster",
      convert: "Convertir archivo",
      converting: "Convirtiendo...",
      downloadReady: "¡Su archivo está listo!",
      download: "Descargar",
      convertAnother: "Convertir otro archivo",
      error: "Error",
      vectorDesc: "Datos de puntos, líneas y polígonos (ej: shapefiles, GeoJSON)",
      rasterDesc: "Datos matriciales (ej: imágenes satelitales, DEM)",
      selectFormatFirst: "Por favor, seleccione un formato de salida",
      selectFileFirst: "Por favor, primero seleccione un archivo",
      conversionSuccess: "¡Conversión exitosa!",
      conversionError: "Se produjo un error durante la conversión",
      supportedFormats: "Tipos de archivo soportados: Shapefile, GeoJSON, GeoTIFF, KML, GPX, y más",
      language: "Idioma",
      autoDetect: "El tipo de archivo se detecta automáticamente",
      chooseCompatible: "Elija un formato compatible según su tipo de datos",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
