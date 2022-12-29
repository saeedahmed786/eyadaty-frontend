import React from 'react'
import Image from 'next/image'
import apphand from '/assets/apphand.svg'

export default function DownloadApp({ noMargin }) {
  return (
    <div className="bg-[url('../assets/downloadbanner.png')] bg-cover bg-no-repeat">
      <div className={`flex flex-row justify-between flex-wrap min-h-[480px] h-full ${!noMargin && "mb-12"} px-5 container mx-auto`}>
        <div className='flex flex-col justify-center space-y-5 sm:w-3/5 text-center sm:text-left py-5 sm:py-0'>
          <h1 className="text-5xl font-bold text-[#FFFFFF] sm:pr-32">
            Téléchargez l`application Eyadaty.
          </h1>
          <h3 className="text-1xl font-thin text-[#FFFFFF]">
            Et prenez bien soin de votre santé.
          </h3>
          <div className='space-x-3 flex gap-4 justify-center sm:justify-start flex-wrap' style={{ width: "100%" }}>
            <button className="bg-gray-100 inline-flex p-4 rounded-lg items-center hover:bg-gray-200 focus:outline-none w-50 h-[70px]">
              <span className="flex items-start flex-col leading-none mr-2">
                <span className="text-[12px] text-gray-600 mb-1">{"Téléchargez l'application depuis"}</span>
                <span className="text-[32px] font-[700]">Apple Store</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-10" viewBox="0 0 305 305">
                <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
              </svg>
            </button>
            <button className="bg-gray-100 inline-flex p-4 rounded-lg items-center hover:bg-gray-200 focus:outline-none w-50 h-[70px]">
              <span className="flex items-start flex-col leading-none mr-2">
                <span className="text-[12px] text-gray-600 mb-1">{"Téléchargez l'application depuis"}</span>
                <span className="text-[32px] font-[700]">Google Store</span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-10" viewBox="0 0 512 512">
                <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className='sm:w-2/5 hidden sm:flex items-end mt-12 sm:mt-0'>
          <Image src={apphand} alt="Appholding hand" height={400} width={400} />
        </div>
      </div>
    </div>
  )

}
