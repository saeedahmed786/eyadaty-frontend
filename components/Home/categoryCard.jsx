import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CategoryCard({ cat }) {
  const { i18n } = useTranslation();

  return (
    <div className="w-full categoryCard text-center">
      <div className=" bg-[#F5F8FB] rounded-[24px]">
        <div>
          <Image src={i18n.language === "fr" ? cat?.img_f : cat?.img_h} alt="Image of doctor" className='inline-block mb-3' width={50} height={50} />
          <p>{i18n.language === "fr" ? cat?.fr : cat.ar}</p>
        </div>
      </div>
    </div>
  )
}
