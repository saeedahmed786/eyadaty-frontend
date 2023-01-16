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
  const [lang, setLang] = useState("Fr");
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
    // <header className="hidden container mx-auto lg:flex flex-wrap py-6 flex-col md:flex-row items-center">
    <header className="text-gray-600 pt-[14px] pb-[12px] px-[16px] lg:px-0 bg-[#93C01F] body-font mainTopNavbar">
      <div className="lg:container mx-auto flex px-0 sm:px-4 flex-wrap justify-between w-full md:flex-row lg:items-center">
        <div>
          <button onClick={() => router.push("/")} className="flex justify-start title-font text-[14px] font-[500] lg:items-center text-white mb-[14px] md:mb-0">
            {t("Rozaliss")}
          </button>
        </div>
        <div className='w-full sm:w-auto flex items-center gap-[40px] justify-between'>
          <div className='bg-white rounded-[8px] h-[32px] px-[12px] flex items-center justify-center'>
            <p className={"text-[12px] tracking-wide font-[500] text-[#1C2126] "}>
              {t("Compte Proféssionel ?")}
            </p>
          </div>
          <div className=' text-white p-2'>
            <Link href="/blogs">{t("Blog")}</Link>
          </div>
          <div className='relative'>
            <div onClick={() => setShow(!show)} className='rounded-[32px] w-[56px] cursor-pointer relative border border-white p-[2px] flex items-center gap-1'>
              {
                lang == "fr" || lang == "Fr" ?
                  <Image className={"cursor-pointer"} width={23} height={23} src={france} alt={"France"} />
                  :
                  <Image className={"cursor-pointer"} width={23} height={23} src={arabic} alt={"Arabic"} />
              }
              <span className={"text-sm text-white p-1"} style={{ textTransform: "capitalize" }}>{lang || "Fr"}</span>
            </div>
            {
              show &&
              <div className='border p-1 py-2 bg-sitegreen absolute w-full min-w-[62px] top-10'>
                <div onClick={() => { setLang("Fr"); setShow(!show); changeLanguage("fr") }} className='border-white p-2 flex cursor-pointer items-center gap-2'>
                  <Image className={"cursor-pointer"} width={40} height={40} src={france} alt={"France"} />
                  <span className={"text-sm text-white"} style={{ textTransform: "capitalize" }}>Fr</span>
                </div>
                <div onClick={() => { setLang("Ar"); setShow(!show); changeLanguage("ar") }} className='mt-2 border-white p-2 cursor-pointer flex items-center gap-2'>
                  <Image className={"cursor-pointer"} width={1000} height={1000} src={arabic} alt={"France"} />
                  <span className={"text-sm text-white"} style={{ textTransform: "capitalize" }}>Ar</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header >

  )
}


