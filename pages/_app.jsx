import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/globals.css'
import { CookiesProvider } from "react-cookie"
import i18n from '../components/translations/i18n';
import { I18nextProvider } from 'react-i18next';

function MyApp({ Component, pageProps }) {

  return (
    <CookiesProvider>
      <I18nextProvider i18n={i18n}>
        <Component {...pageProps} />
      </I18nextProvider>
    </CookiesProvider>
  )
}

export default MyApp
