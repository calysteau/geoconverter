import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Languages } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FormatSelector from './components/FormatSelector';
import ConversionResult from './components/ConversionResult';
import LanguageSelector from './components/LanguageSelector';
import axios from 'axios';

function App() {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formats, setFormats] = useState({ vector: [], raster: [] });

  useEffect(() => {
    fetchFormats();
  }, []);

  const fetchFormats = async () => {
    try {
      const response = await axios.get('/api/formats');
      setFormats(response.data);
    } catch (error) {
      console.error('Failed to fetch formats:', error);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) {
      setError(t('selectFileFirst'));
      return;
    }

    if (!selectedFormat) {
      setError(t('selectFormatFirst'));
      return;
    }

    setConverting(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('output_format', selectedFormat);
    formData.append('lang', localStorage.getItem('i18nextLng') || 'en');

    try {
      const response = await axios.post('/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      setError(error.response?.data?.detail || t('conversionError'));
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSelectedFormat('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-white/90 text-lg">
            {t('subtitle')}
          </p>
          <div className="mt-4 flex justify-center">
            <LanguageSelector />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!result ? (
            <>
              {/* Step 1: File Upload */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    1
                  </span>
                  {t('step1')}
                </h2>
                <FileUpload onFileSelect={handleFileSelect} selectedFile={file} />
                <p className="text-sm text-gray-500 mt-2">
                  💡 {t('autoDetect')}
                </p>
              </div>

              {/* Step 2: Format Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    2
                  </span>
                  {t('step2')}
                </h2>
                <FormatSelector
                  formats={formats}
                  selectedFormat={selectedFormat}
                  onFormatSelect={handleFormatSelect}
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 {t('chooseCompatible')}
                </p>
              </div>

              {/* Step 3: Convert */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    3
                  </span>
                  {t('step3')}
                </h2>
                <button
                  onClick={handleConvert}
                  disabled={converting || !file || !selectedFormat}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {converting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('converting')}
                    </span>
                  ) : (
                    t('convert')
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <strong className="font-semibold">{t('error')}: </strong>
                  <span>{error}</span>
                </div>
              )}

              {/* Info */}
              <div className="mt-8 text-center text-sm text-gray-500">
                {t('supportedFormats')}
              </div>
            </>
          ) : (
            <ConversionResult result={result} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80 text-sm">
          Powered by GDAL/OGR
        </div>
      </div>
    </div>
  );
}

export default App;
