import Image from 'next/image'
import React from 'react'
import illustration from "../assets/404.svg"
import DownloadApp from '../components/Home/downloadApp'
import MainLayout from '../components/Layouts/MainLayout'


const NotFoundPage = () => {

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto pb-24 pt-6'>
                <div className='flex justify-center align-middle text-center'>
                    <div>
                        <Image src={illustration} alt="illustration" className='w-full' />
                        <h1 className='text-[64px] leading-[72px] font-[700]'>Page non trouvée</h1>
                        <p className='my-5 para'>La page que vous recherchez peut avoir été supprimée, <br /> modifiée ou temporairement indisponible</p>
                        <button type="submit" className='btn w-full bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                            Retour à la page principale
                        </button>
                    </div>
                </div>
            </div>
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default NotFoundPage
