import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CategoryCard({ cat, language }) {
  const { i18n } = useTranslation();
  console.log(i18n)
  return (
    <div className="w-full categoryCard text-center">
      <div className="border-gray-200 bg-[#F5F8FB] px-2 py-12 rounded-[24px]">
        <Image src={i18n.language === "fr" ? cat?.img_f : cat?.img_h} alt="Image of doctor" className='inline-block mb-3' width={50} height={50} />
        <p className="leading-relaxed">{i18n.language === "fr" ? cat?.fr : cat.ar}</p>
      </div>
    </div>
  )
}
