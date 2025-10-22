import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Download, RefreshCw } from 'lucide-react';
import axios from 'axios';

function ConversionResult({ result, onReset }) {
  const { t } = useTranslation();

  const handleDownload = async () => {
    try {
      const response = await axios.get(result.download_url, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', result.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Cleanup file on server
      await axios.delete(`/api/cleanup/${result.download_url.split('/').pop()}`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="text-center py-8">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {t('downloadReady')}
      </h2>

      <p className="text-gray-600 mb-8">
        {result.message}
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 inline-block">
        <div className="text-sm text-gray-600 mb-2">
          <strong>{t('fileSelected')}:</strong> {result.filename}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Type:</strong> {result.input_type}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Format:</strong> {result.output_format.toUpperCase()}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" />
          {t('download')}
        </button>

        <button
          onClick={onReset}
          className="w-full bg-gray-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {t('convertAnother')}
        </button>
      </div>
    </div>
  );
}

export default ConversionResult;
