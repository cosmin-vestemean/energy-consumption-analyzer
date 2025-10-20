import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <select
        value={language}
        onChange={(e) => switchLanguage(e.target.value)}
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="ro">Română</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
