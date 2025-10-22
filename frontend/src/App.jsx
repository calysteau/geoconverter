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
  const [fileType, setFileType] = useState(null); // 'vector' or 'raster'
  const [detecting, setDetecting] = useState(false);
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

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
    setFileType(null);
    setSelectedFormat('');

    if (!selectedFile) return;

    // Detect file type
    setDetecting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('lang', localStorage.getItem('i18nextLng') || 'en');

    try {
      const response = await axios.post('/api/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileType(response.data.file_type);
    } catch (error) {
      setError(error.response?.data?.detail || t('detectionFailed'));
      setFile(null);
    } finally {
      setDetecting(false);
    }
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
    setFileType(null);
    setSelectedFormat('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-bg-dark shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Globe className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold text-text-inverse">
              GeoConverter
            </h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bg-dark to-[#1a2a32] text-text-inverse py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg opacity-90">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!result ? (
            <>
              {/* Step 1: File Upload */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-text-primary">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    1
                  </span>
                  {t('step1')}
                </h2>
                <FileUpload onFileSelect={handleFileSelect} selectedFile={file} />

                {detecting && (
                  <div className="mt-3 flex items-center text-primary">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">{t('detecting')}</span>
                  </div>
                )}

                {fileType && !detecting && (
                  <div className={`mt-3 p-3 rounded-lg border ${
                    fileType === 'vector'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <p className={`text-sm font-semibold ${
                      fileType === 'vector' ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      ✓ {fileType === 'vector' ? t('detectedVector') : t('detectedRaster')}
                    </p>
                  </div>
                )}

                <p className="text-sm text-text-secondary mt-2">
                  💡 {t('autoDetect')}
                </p>
              </div>

              {/* Step 2: Format Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-text-primary">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    2
                  </span>
                  {t('step2')}
                </h2>
                <FormatSelector
                  formats={formats}
                  selectedFormat={selectedFormat}
                  onFormatSelect={handleFormatSelect}
                  fileType={fileType}
                  disabled={!fileType || detecting}
                />
                {fileType && (
                  <div className="mt-3 bg-secondary/10 border border-secondary rounded-lg p-3">
                    <p className="text-sm text-secondary">
                      ℹ️ {fileType === 'vector' ? t('onlyVectorFormats') : t('onlyRasterFormats')}
                    </p>
                  </div>
                )}
                <p className="text-sm text-text-secondary mt-2">
                  💡 {t('chooseCompatible')}
                </p>
              </div>

              {/* Step 3: Convert */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-text-primary">
                  <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">
                    3
                  </span>
                  {t('step3')}
                </h2>
                <button
                  onClick={handleConvert}
                  disabled={converting || !file || !selectedFormat}
                  className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
              <div className="mt-8 text-center text-sm text-text-secondary">
                {t('supportedFormats')}
              </div>
            </>
          ) : (
            <ConversionResult result={result} onReset={handleReset} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-bg-dark text-text-inverse py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">Powered by GDAL/OGR</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
