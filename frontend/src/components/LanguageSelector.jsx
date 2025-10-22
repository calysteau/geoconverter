import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-4 py-2 rounded-md transition-all font-medium ${
            i18n.language === lang.code
              ? 'bg-primary text-white shadow-md'
              : 'text-white hover:bg-white/20'
          }`}
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;
