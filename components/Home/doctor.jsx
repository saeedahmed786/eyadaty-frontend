import React from 'react'
import Image from 'next/image'
import apphand from '/assets/doctor.svg'
import apphandAr from '/assets/ArabicDoc.svg'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next';
import RightIcon from '../icons/righticon'

export default function Doctor() {
    const router = useRouter();
    const { t, i18n } = useTranslation();

    return (
        <div className="bg-gray-700 w-full py-1 mt-[80px] sm:mt-[180px] doctorComp">
            <div className="flex flex-row p-4 sm:p-0 flex-wrap justify-between my-[14px] px-5 container mx-auto bg-center bg-opacity-5 bg-cover bg-no-repeat">
                <div className='flex flex-col rtl:text-start text-center sm:text-left justify-center sm:pr-10 space-y-[24px] w-full sm:w-3/5 leftText'>
                    <h1 className="text-[56px] leading-[64px] font-[700] text-white dark:text-white ltr:sm:pr-32">
                        {t("Se sentir mieux pour trouver des soins de santé")}
                    </h1>
                    <h3 className="text-[16px] font-[400] text-white dark:text-white sm:w-[60%]">
                        {t("Nous éliminons les conjectures pour trouver les bons médecins, hôpitaux et soins pour vous et votre famille.")}
                    </h3>
                    <div className='space-x-4 flex justify-center sm:block'>
                        <button onClick={() => router.push("/search")} className="flex items-center gap-[11px] justify-center text-[16px] font-[500] bg-transparent border-white border rounded-[12px] w-[222px] h-[50px] text-white">
                            {t("Trouver un docteur")} <RightIcon />
                        </button>
                    </div>
                </div>
                <div className='sm:w-2/5 hidden sm:flex items-center mt-10 sm:mt-0 rightDoc md:text-end'>
                    {
                        i18n.language === "fr"
                            ?
                            <Image src={apphand} alt="Appholding hand" className="object-contain" height={452} width={460} />
                            :
                            <Image src={apphandAr} alt="Appholding hand" className="object-contain" height={452} width={460} />
                    }
                </div>
            </div>
        </div>
    )

}
