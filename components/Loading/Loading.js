import Image from 'next/image';
import React from 'react'
import loading from "../../assets/loading.gif";

export const Loading = () => {
    return (
        <div className='flex justify-center items-center' style={{ height: "10vh" }}>
            <Image src={loading} alt="Loading" width="43" height="43" />
        </div>
    )
}
