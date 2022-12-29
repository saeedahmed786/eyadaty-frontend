import Image from 'next/image'
import React from 'react'
import Doc from "../../assets/doc.jpg"
import Check from "../../assets/Checkmark.svg"

const NameAndPicCard = ({ name, field, checkmark }) => {
    return (
        <div className='nameAndPic w-full flex justify-between pr-6'>
            <div className='flex items-center gap-2'>
                <div className='profileImg'>
                    <Image src={Doc} alt="Doctor" width={32} height={32} className="rounded-[50%]" />
                </div>
                <div className='w-full'>
                    <div className='flex gap-2'>
                        <h6>{name}</h6>
                        {
                            checkmark &&
                            <Image src={Check} alt="Checkmark" />
                        }
                    </div>
                    <p className='mt-2 text-left'>{field}</p>
                </div>
            </div>

        </div>
    )
}

export default NameAndPicCard
