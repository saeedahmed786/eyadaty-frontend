import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/globals.css'
import { Cookies, CookiesProvider } from "react-cookie"
import i18n from '../components/translations/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  return (
    <I18nextProvider i18n={i18n}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </I18nextProvider>
  )
}

export default MyApp
