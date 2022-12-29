import React, { useState } from 'react'
import EyedatyLogo from './Home/eyedatyLogo'
import france from "/assets/france.png"
import Image from "next/image";
import { Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Option } = Select;

export default function TopNavbar() {
  const [lang, setLang] = useState("fr");
  const [show, setShow] = useState(false);
  const router = useRouter()

  return (
    <header className="text-gray-600 py-4 px-5 lg:px-20 bg-sitegreen body-font">
      <div className="container mx-auto flex justify-between flex-col  md:flex-row lg:items-center">
        <div>
          <button onClick={() => router.push("/")} className="flex justify-start title-font text-[14px] font-[500] lg:items-center text-white mb-4 md:mb-0">
            Rozalis
          </button>
        </div>
        <div className=' lg:w-1/4 w-full flex justify-between '>
          <div className='bg-white rounded-[8px] px-4 p-2 flex items-center justify-center'>
            <p className={"text-[14px] tracking-wide font-[500] text-dark__color"}>
              Compte Professional?
            </p>
          </div>
          <div className=' text-white p-2'>
            <Link href="/blogs">Blog</Link>
          </div>
          <div className='relative'>
            <div onClick={() => setShow(!show)} className='rounded-[32px] cursor-pointer relative border border-white p-0 flex items-center gap-1'>
              <Image className={"cursor-pointer"} width="23px" src={france} alt={"France"} />
              <span className={"text-sm text-white p-1"}>{lang}</span>
            </div>
            {
              show &&
              <div className='border p-1 py-2 bg-sitegreen absolute w-full top-10'>
                <div onClick={() => { setLang("Fr"); setShow(!show) }} className='border-white p-2 flex cursor-pointer items-center gap-2'>
                  <Image className={"cursor-pointer"} width="23px" src={france} alt={"France"} />
                  <span className={"text-sm text-white"}>Fr</span>
                </div>
                <div onClick={() => { setLang("Ar"); setShow(!show) }} className='mt-2 border-white p-2 cursor-pointer flex items-center gap-2'>
                  <Image className={"cursor-pointer"} width="23px" src={france} alt={"France"} />
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


