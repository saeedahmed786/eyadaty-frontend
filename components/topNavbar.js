import React, { useEffect, useState } from 'react'
import france from "/assets/france.png"
import arabic from "/assets/Arabic.svg"
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie';

export default function TopNavbar() {
  const cookies = new Cookies;
  const [lang, setLang] = useState("fr");
  const [show, setShow] = useState(false);
  const router = useRouter()
  const { t, i18n } = useTranslation();
  // const [language, setLanguage] = useState("en");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    // setLanguage(lng)
    if (lng === "ar") {
      cookies.set('language', "ar");
      document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
    } else {
      cookies.set('language', "fr");
      document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      changeLanguage(cookies.get("language"));
      setLang(cookies.get("language"))
    }, 1000);

    return () => {

    }
  }, [])



  return (
    <header className="text-gray-600 py-4 px-5 lg:px-20 bg-sitegreen body-font">
      <div className="container mx-auto flex justify-between flex-col  md:flex-row lg:items-center">
        <div>
          <button onClick={() => router.push("/")} className="flex justify-start title-font text-[14px] font-[500] lg:items-center text-white mb-4 md:mb-0">
            {t("Rozaliss")}
          </button>
        </div>
        <div className=' lg:w-1/4 w-full flex justify-between '>
          <div className='bg-white rounded-[8px] px-4 p-2 flex items-center justify-center'>
            <p className={"text-[14px] tracking-wide font-[500] text-dark__color"}>
              {t("Compte Proféssionel ?")}
            </p>
          </div>
          <div className=' text-white p-2'>
            <Link href="/blogs">{t("Blog")}</Link>
          </div>
          <div className='relative'>
            <div onClick={() => setShow(!show)} className='rounded-[32px] cursor-pointer relative border border-white p-0 flex items-center gap-1'>
              <Image className={"cursor-pointer"} width={23} height={23} src={france} alt={"France"} />
              <span className={"text-sm text-white p-1"}>{lang || "fr"}</span>
            </div>
            {
              show &&
              <div className='border p-1 py-2 bg-sitegreen absolute w-full min-w-[62px] top-10'>
                <div onClick={() => { setLang("Fr"); setShow(!show); changeLanguage("fr") }} className='border-white p-2 flex cursor-pointer items-center gap-2'>
                  <Image className={"cursor-pointer"} width={40} height={40} src={france} alt={"France"} />
                  <span className={"text-sm text-white"}>Fr</span>
                </div>
                <div onClick={() => { setLang("Ar"); setShow(!show); changeLanguage("ar") }} className='mt-2 border-white p-2 cursor-pointer flex items-center gap-2'>
                  <Image className={"cursor-pointer"} width={1000} height={1000} src={arabic} alt={"France"} />
                  <span className={"text-sm text-white"}>Ar</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header >

  )
}


