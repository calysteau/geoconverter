import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Map } from 'lucide-react';

function FormatSelector({ formats, selectedFormat, onFormatSelect, fileType, disabled }) {
  const { t } = useTranslation();

  const FormatButton = ({ format, type, isDisabled }) => (
    <button
      onClick={() => !isDisabled && onFormatSelect(format.code)}
      disabled={isDisabled}
      className={`p-3 rounded-lg border-2 transition-all text-left ${
        isDisabled
          ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
          : selectedFormat === format.code
          ? 'border-primary bg-primary/10 shadow-md'
          : 'border-gray-200 hover:border-primary/50 hover:bg-bg-secondary cursor-pointer'
      }`}
    >
      <div className="font-semibold text-text-primary">{format.name}</div>
      <div className="text-sm text-text-secondary">.{format.extension}</div>
    </button>
  );

  // Determine which formats should be disabled
  const shouldShowVector = !fileType || fileType === 'vector';
  const shouldShowRaster = !fileType || fileType === 'raster';

  return (
    <div className={`space-y-6 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Vector Formats */}
      <div className={!shouldShowVector ? 'hidden' : ''}>
        <h3 className="text-lg font-semibold mb-3 flex items-center text-text-primary">
          <Map className="w-5 h-5 mr-2 text-blue-600" />
          {t('vectorFormats')}
        </h3>
        <p className="text-sm text-text-secondary mb-3">
          {t('vectorDesc')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {formats.vector.map((format) => (
            <FormatButton
              key={format.code}
              format={format}
              type="vector"
              isDisabled={disabled || fileType === 'raster'}
            />
          ))}
        </div>
      </div>

      {/* Raster Formats */}
      <div className={!shouldShowRaster ? 'hidden' : ''}>
        <h3 className="text-lg font-semibold mb-3 flex items-center text-text-primary">
          <Box className="w-5 h-5 mr-2 text-green-600" />
          {t('rasterFormats')}
        </h3>
        <p className="text-sm text-text-secondary mb-3">
          {t('rasterDesc')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {formats.raster.map((format) => (
            <FormatButton
              key={format.code}
              format={format}
              type="raster"
              isDisabled={disabled || fileType === 'vector'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormatSelector;
