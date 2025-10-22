"""Internationalization support for the GIS Converter"""

MESSAGES = {
    "en": {
        "upload_failed": "Failed to upload file. Please try again.",
        "conversion_success": "File converted successfully!",
        "conversion_failed": "Conversion failed",
        "invalid_input_file": "Invalid input file. Cannot open the file.",
        "unsupported_format": "Unsupported output format.",
        "driver_not_available": "Driver '{}' is not available.",
        "create_output_failed": "Failed to create output file.",
        "copy_layer_failed": "Failed to copy layer.",
        "unknown_file_type": "Cannot determine file type. The file may be corrupted or in an unsupported format.",
        "format_mismatch_vector": "The selected format is not compatible with vector data. Please choose a vector format.",
        "format_mismatch_raster": "The selected format is not compatible with raster data. Please choose a raster format.",
        "unknown_error": "An unknown error occurred.",
    },
    "fr": {
        "upload_failed": "Échec du téléchargement du fichier. Veuillez réessayer.",
        "conversion_success": "Fichier converti avec succès !",
        "conversion_failed": "Échec de la conversion",
        "invalid_input_file": "Fichier d'entrée invalide. Impossible d'ouvrir le fichier.",
        "unsupported_format": "Format de sortie non supporté.",
        "driver_not_available": "Le pilote '{}' n'est pas disponible.",
        "create_output_failed": "Échec de la création du fichier de sortie.",
        "copy_layer_failed": "Échec de la copie de la couche.",
        "unknown_file_type": "Impossible de déterminer le type de fichier. Le fichier peut être corrompu ou dans un format non supporté.",
        "format_mismatch_vector": "Le format sélectionné n'est pas compatible avec les données vectorielles. Veuillez choisir un format vectoriel.",
        "format_mismatch_raster": "Le format sélectionné n'est pas compatible avec les données raster. Veuillez choisir un format raster.",
        "unknown_error": "Une erreur inconnue s'est produite.",
    },
    "es": {
        "upload_failed": "Error al cargar el archivo. Por favor, inténtelo de nuevo.",
        "conversion_success": "¡Archivo convertido con éxito!",
        "conversion_failed": "Conversión fallida",
        "invalid_input_file": "Archivo de entrada inválido. No se puede abrir el archivo.",
        "unsupported_format": "Formato de salida no soportado.",
        "driver_not_available": "El controlador '{}' no está disponible.",
        "create_output_failed": "Error al crear el archivo de salida.",
        "copy_layer_failed": "Error al copiar la capa.",
        "unknown_file_type": "No se puede determinar el tipo de archivo. El archivo puede estar dañado o en un formato no soportado.",
        "format_mismatch_vector": "El formato seleccionado no es compatible con datos vectoriales. Por favor, elija un formato vectorial.",
        "format_mismatch_raster": "El formato seleccionado no es compatible con datos raster. Por favor, elija un formato raster.",
        "unknown_error": "Se ha producido un error desconocido.",
    }
}

def get_message(key: str, lang: str = "en") -> str:
    """Get translated message"""
    lang = lang.lower()
    if lang not in MESSAGES:
        lang = "en"

    return MESSAGES[lang].get(key, MESSAGES["en"].get(key, key))
