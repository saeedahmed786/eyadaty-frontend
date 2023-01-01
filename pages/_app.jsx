import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/globals.css'
import { CookiesProvider } from "react-cookie"
import i18n from '../components/translations/i18n';
import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  // const changeLanguage = lng => {
  //   i18n.changeLanguage("fr");
  //   setLanguage(lng)
  //   if (lng === "ar") {
  //     document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
  //   } else {
  //     document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
  //   }
  // };

  // useEffect(() => {
  //   document.getElementsByTagName('html')[0].dir === "rtl" && changeLanguage();

  //   return () => {

  //   }
  // }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </I18nextProvider>
  )
}

export default MyApp
