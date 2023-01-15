import React, { useEffect, useState } from 'react'
import EyedatyLogo from './Home/eyedatyLogo'
import BurgerMenuIcon from '../components/icons/burgermenuicon'
import SearchIcon from "/assets/search.svg"
import profileIcon from "/assets/profileSmall.svg"
import favIcon from "/assets/favourite.svg"
import createPage from "/assets/PlusBlack.svg"
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
      router.push("/login")
    }, 1000);
  }

  const menu = (
    <Menu>
      <Menu.Item key={0} className="mt-[8px]">
        <div className='flex gap-[8px] items-center'>
          <img src={userAuth?.picture?.url} width={40} className="rounded-[50%] object-cover h-[40px]" alt="Profile" />
          <div>
            <div className='text-[#65737E] text-[12px] font-[400] tracking-wide rtl:text-start'>{t("Bienvenu")}</div>
            <div className='text-[16px] font-[700] text-[#1C2126]'>{userAuth?.fullName}</div>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key={1} className="mt-[24px]">
        <div className='flex gap-[10px] items-center'>
          <Image src={profileIcon} alt="Profile Icon" />
          <a href="/profile" className='text-[#333B42] text-[14px] font-[500]'>{t("Profile")}</a>
        </div>
      </Menu.Item>
      <Menu.Item key={2} className="mt-[20px]">
        <div className='flex gap-[10px] items-center'>
          <Image src={favIcon} alt="Favourite Icon" />
          <Link href="/favourites" className='text-[#333B42] text-[14px] font-[500]'>{t("Favoris")}</Link>
        </div>
      </Menu.Item>
      <Menu.Item key={3} className="mt-[20px]">
        <div className='flex gap-[10px] items-center'>
          <Image src={createPage} alt="Create Page Icon" />
          <Link href="/profile/create-page" className='text-[#333B42] text-[14px] font-[500]'>{t("Créer un page")}</Link>
        </div>
      </Menu.Item>
      <Menu.Item key={4} className="mt-[21px]">
        {/* <div className='flex gap-[11px] items-center'> */}
        <button className='h-[32px] w-full mt-4 mb-[16px] px-[16px] py-[8px] rounded-[8px] border border-[#FF6551] text-[14px] text-[#FF6551] font-[500] flex justify-center items-center ' onClick={handleLogout}>{t("Déconnexion")}</button>
        {/* </div> */}
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
      <div className="hidden lg:container mx-auto lg:flex flex-wrap py-[16px] flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-[#333B42] mb-0 md:mb-0">
          <EyedatyLogo />
        </a>
        <nav className="hidden ltr:md:mr-auto rtl:md:ml-auto rtl:gap-10 rtl:md:mr-10 gap-4 md:ml-4 md:py-1 md:pl-4 md:border-gray-400	md:flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-[#0094DA]">{t("Accueil")}</Link>
          <Link href="/about-us" className="mr-5 hover:text-[#0094DA]">{t("À propos de nous")}</Link>
          <Link href="/contact-us" className="mr-5 hover:text-[#0094DA]">{t("Contactez-nous")}</Link>
        </nav>
        <div className='w-1/2 flex flex-row gap-20 justify-end'>
          <div className='hidden md:block w-2/5 relative'>
            <input className=" placeholder:text-slate-400 block text-left w-full rounded-[12px] bg-[#F5F8FB] p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder={t("Chercher")} type="text" name="search" />
            <div className='absolute top-4 right-2 text-black'>
              <Image className='absolute' src={SearchIcon} alt="Search" width={32} />
            </div>
          </div>
          {
            userAuth ?
              <Dropdown overlay={menu}>
                <button className='flex items-center gap-[10px]'>
                  <Image src={DownArrow} alt="DownArrow" />
                  <div className='text-[16px] font-[500] text-[#333B42]'>{userAuth?.fullName}</div>
                  {
                    userAuth?.picture ?
                      <img src={userAuth?.picture?.url} width={32} className="rounded-[50%] object-cover h-[32px]" alt="Profile" />
                      :
                      <Image src={Doc} alt="Doc" width={32} height={32} className="rounded-[50%]" />
                  }
                </button>
              </Dropdown>
              :
              <div className='flex items-center gap-2'>
                <button onClick={() => router.push("/login")} className="focus:outline-0 w-[108px] border bg-transparent border-[#0094DA] text-[#0094DA] text-[14px] font-[500] rounded-[12px] py-[8px]">
                  {t("Connexion")}
                </button>
                <button onClick={() => router.push("/signup")} className="focus:outline-0 w-[108px] bg-[#0094DA] hover:text-white text-white text-[14px] font-[500] rounded-[12px] py-[8px]">
                  {t("S'inscrire")}
                </button>
              </div>
          }
        </div>
      </div>
      {/* phonenav */}
      <div className='mainMobileNav'>
        <div className="w-full px-[16px] py-[16px] flex justify-between lg:hidden">
          <div className='w-1/2 py-3'>
            <button onClick={() => setShow(!show)} >
              <BurgerMenuIcon />
            </button>
          </div>
          <a className="flex title-font font-medium items-center  text-[#333B42] mb-0 md:mb-0">
            <EyedatyLogo />
          </a>
        </div>
        <div className='relative'>
          {
            show &&
            <div className='pb-[16px] absolute w-full bg-white z-[1000] pt-[36px]'>
              <nav className="px-[28px] md:border-l md:border-gray-400	text-base justify-center">
                <div>
                  <Link href="/" className="mr-5 text-[16px] font-[500] hover:text-[#0094DA]">{t("Accueil")}</Link>
                </div>
                <div className='mt-[24px]'>
                  <Link href="/about-us" className="mr-5 hover:text-[#0094DA]">{t("À propos de nous")}</Link>
                </div>
                <div className='mt-[24px]'>
                  <Link href="/contact-us" className="mr-5 hover:text-[#0094DA]">{t("Contactez-nous")}</Link>
                </div>
                {/* <div className='mt-6 px-[28px]'> */}
                {
                  userAuth ?
                    <div>
                      <div className='mt-[24px]'>
                        <a href="/profile" className='text-[#333B42] text-[14px] font-[500]'>{t("Profile")}</a>
                      </div>
                      <div className='mt-[24px]'>
                        <Link href="/favourites" className='text-[#333B42] text-[14px] font-[500]'>{t("Favoris")}</Link>
                      </div>
                      <div className='mt-[24px]'>
                        <Link href="/profile/create-page" className='text-[#333B42] text-[14px] font-[500]'>{t("Créer un page")}</Link>
                      </div>
                      <div className='mt-[32px]'>
                        <button className='h-[32px] w-full mt-4 px-[16px] py-[8px] rounded-[8px] border border-[#FF6551] text-[14px] text-[#FF6551] font-[500] flex justify-center items-center ' onClick={handleLogout}>{t("Déconnexion")}</button>
                      </div>
                    </div>
                    :
                    <div>
                      <button onClick={() => router.push("/login")} className="focus:outline-0 w-full text-[#0094DA] border border-[#0094DA] text-[14px] font-[500] rounded-[8px] h-[32px]">
                        {t("Connexion")}
                      </button>
                      <button onClick={() => router.push("/signup")} className="mt-[10px] focus:outline-0 w-[100%] border bg-[#0094DA] text-[#fff] text-[14px] font-[500] rounded-[8px] h-[32px]">
                        {t("S'inscrire")}
                      </button>
                    </div>
                }
                {/* </div> */}
              </nav>
            </div>
          }
        </div>
      </div>
    </header >
  )
}


