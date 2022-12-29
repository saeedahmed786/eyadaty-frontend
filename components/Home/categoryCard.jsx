import Image from 'next/image'
import React from 'react'

export default function CategoryCard({ cat }) {
  return (
    <div className="w-full categoryCard text-center">
      <div className="border-gray-200 bg-[#F5F8FB] px-2 py-12 rounded-[24px]">
        <Image src={cat?.img_h} alt="Image of doctor" className='inline-block mb-3' width={50} height={50} />
        <p className="leading-relaxed">{cat?.fr}</p>
      </div>
    </div>
  )
}
