import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import uzTranslation from './locales/uz/translation.json';
import chnTranslation from '../locales/chn/translation.json';
import deuTranslation from '../locales/deu/translation.json';
import jpnTranslation from '../locales/jpn/translation.json';
import korTranslation from '../locales/kor/translation.json';
import ruTranslation from '../locales/ru/translation.json';

i18n.use(initReactI18next).init({
	resources: {
		// uz: { translation: uzTranslation },
		CHN: { translation: chnTranslation },
		DEU: { translation: deuTranslation },
		JPN: { translation: jpnTranslation },
		KOR: { translation: korTranslation },
		RU: { translation: ruTranslation },
	},
	lng: 'RU', // Default til
	fallbackLng: 'RU',
	
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
