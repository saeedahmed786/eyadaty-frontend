import React, { useEffect, useState } from 'react'
import EyedatyLogo from './Home/eyedatyLogo'
import BurgerMenuIcon from '../components/icons/burgermenuicon'
import SearchIcon from "/assets/search.svg"
import DownArrow from "../assets/DownArrow.svg"
import Doc from "../assets/doc.jpg"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dropdown, Menu } from 'antd'
import { isAuthenticated, logout } from './Auth/auth'
import { useTranslation } from 'react-i18next'


export default function Navbar() {
  const router = useRouter();
  const [userAuth, setUserAuth] = useState({});
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      document.location.reload();
    }, 2000);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/profile">{t("Profile")}</a>
      </Menu.Item>
      <Menu.Item>
        <Link href="/favourites">{t("Favoris")}</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/create-page">{t("Créer un page")}</Link>
      </Menu.Item>
      <Menu.Item>
        <button onClick={handleLogout}>{t("Déconnexion")}</button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setUserAuth(isAuthenticated());

    return () => {

    }
  }, [])


  return (
    <header className="text-gray-600 body-font">
      <div className="hidden container mx-auto lg:flex flex-wrap py-6 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <EyedatyLogo />
        </a>
        <nav className="hidden ltr:md:mr-auto rtl:md:ml-auto rtl:gap-10 rtl:md:mr-10 gap-4 md:ml-4 md:py-1 md:pl-4 md:border-gray-400	md:flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-[#0094DA]">{t("Accueil")}</Link>
          <Link href="/about-us" className="mr-5 hover:text-[#0094DA]">{t("À propos de nous")}</Link>
          <Link href="/contact-us" className="mr-5 hover:text-[#0094DA]">{t("Contactez-nous")}</Link>
        </nav>
        <div className='w-1/2 flex flex-row gap-20 justify-end'>
          <div className='hidden md:block w-2/5 relative'>
            <input className=" placeholder:text-slate-400 block text-left w-full border border-slate-300 rounded-[12px] bg-[#F5F8FB] p-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder={t("Chercher")} type="text" name="search" />
            <div className='absolute top-4 right-2 text-black'>
              <Image className='absolute' src={SearchIcon} alt="Search" width={32} />
            </div>
          </div>
          {
            userAuth ?
              <Dropdown overlay={menu}>
                <button className='flex items-center gap-2'>
                  <Image src={DownArrow} alt="DownArrow" />
                  <div>{userAuth?.fullName}</div>
                  {
                    userAuth?.picture ?
                      <img src={userAuth?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                      :
                      <Image src={Doc} alt="Doc" width={43} height={43} className="rounded-[50%]" />
                  }
                </button>
              </Dropdown>
              :
              <div className='flex items-center gap-2'>
                <button onClick={() => router.push("/signup")} className="focus:outline-0 min-w-[130px] w-full border bg-transparent border-[#0094DA] text-[#0094DA] rounded-[12px] p-2">
                  {t("S'inscrire")}
                </button>
                <button onClick={() => router.push("/login")} className="focus:outline-0 min-w-[130px] w-full bg-[#0094DA] hover:text-white text-white rounded-[12px] p-2">
                  {t("Connexion")}
                </button>
              </div>
          }
        </div>
      </div>
      {/* phonenav */}
      <div>
        <div className="w-full px-8 py-2 flex justify-between lg:hidden">
          <div className='w-1/2 py-3'>
            <button onClick={() => setShow(!show)} >
              <BurgerMenuIcon />
            </button>
          </div>
          <a className="flex title-font font-medium items-center  text-gray-900 mb-4 md:mb-0">
            <EyedatyLogo />
          </a>
        </div>
        <div className='relative'>
          {
            show &&
            <div className='pb-6 absolute w-full bg-white z-[1000]'>
              <nav className="pl-10 px-6  md:border-l md:border-gray-400	text-base justify-center">
                <div>
                  <Link href="/" className="mr-5 text-[16px] font-[500] hover:text-[#0094DA]">{t("Accueil")}</Link>
                </div>
                <div className='mt-4'>
                  <Link href="/about-us" className="mr-5 hover:text-[#0094DA]">{t("À propos de nous")}</Link>
                </div>
                <div className='mt-4'>
                  <Link href="/contact-us" className="mr-5 hover:text-[#0094DA]">{t("Contactez-nous")}</Link>
                </div>
              </nav>
              <div className='mt-6 px-4'>
                {
                  userAuth ?
                    <Dropdown overlay={menu}>
                      <button className='flex items-center gap-2'>
                        <Image src={DownArrow} alt="DownArrow" />
                        <div>{userAuth?.fullName}</div>
                        {
                          userAuth?.picture ?
                            <img src={userAuth?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                            :
                            <Image src={Doc} alt="Doc" width={43} height={43} className="rounded-[50%]" />
                        }
                      </button>
                    </Dropdown>
                    :
                    <div>
                      <button onClick={() => router.push("/login")} className="focus:outline-0 w-full bg-[#0094DA] hover:text-white text-white rounded-[12px] p-2">
                        {t("Connexion")}
                      </button>
                      <button onClick={() => router.push("/signup")} className="mt-3 focus:outline-0 w-[100%] border bg-transparent border-[#0094DA] text-[#0094DA] rounded-[12px] p-2">
                        {t("S'inscrire")}
                      </button>
                    </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </header >
  )
}


