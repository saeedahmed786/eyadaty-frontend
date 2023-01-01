import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import illustration from "../assets/404.svg"
import DownloadApp from '../components/Home/downloadApp'
import MainLayout from '../components/Layouts/MainLayout'


const NotFoundPage = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto pb-24 pt-6'>
                <div className='flex justify-center align-middle text-center'>
                    <div>
                        <Image src={illustration} alt="illustration" className='w-full' />
                        <h1 className='text-[64px] leading-[72px] font-[700]'>{t("Page non trouvée")}</h1>
                        <div className='flex justify-center'>
                            <p className='my-5 para  max-w-[460px]'>{t("La page que vous recherchez peut avoir été supprimée, modifiée ou temporairement indisponible")}</p>
                        </div>
                        <button type="submit" onClick={() => router.push("/")} className='btn w-full bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                            {t("Retour à la page principale")}
                        </button>
                    </div>
                </div>
            </div>
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default NotFoundPage
