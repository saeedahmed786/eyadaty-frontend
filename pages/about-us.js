import icon1 from '/assets/CapitalLogo.svg'
import React from 'react'
import RightIcon from '../components/icons/righticon';
import DownloadApp from '../components/Home/downloadApp'
import AboutUs from '../components/Home/aboutUs'
import Image from 'next/image'
import aboutimg from '/assets/Services.svg'
import qoutesWhite from '/assets/quote-right.svg'
import union from '/assets/Union.svg'
import doctor from '/assets/doc.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainLayout from '../components/Layouts/MainLayout';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import doctorImg from '/assets/aboutusimage.svg'



const AboutUsPage = () => {
    const { t } = useTranslation();


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    var settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <MainLayout navbar>
            <div className='AboutUsPage lg:container px-5 mx-auto pb-24 pt-6'>
                <div className='text-center'>
                    <div className='flex gap-2 justify-start xl:justify-center items-center'>
                        <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("À propos de nous")}</button>
                    </div>
                    <h1 className='bigTitle text-start xl:text-center pt-[32px]'>{t("À propos de nous")}</h1>
                </div>
                <section className="text-gray-600 sm:bg-[url('../assets/Lines.png')] bg-cover bg-no-repeat  body-font aboutUsComp">
                    <div className="lg:container mx-auto flex-wrap lg:flex-nowrap flex px-0 sm:px-5 pt-[80px] md:py-[122px] md:flex-row flex-col items-center justify-center ">
                        <div className="hidden sm:block lg:max-w-lg mb-10 lg:mb-0 md:w-full lg:w-1/2 w-5/6">
                            <Image src={doctorImg} alt="Image of doctor" width={420} height={428.03} />
                            {/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"> */}
                        </div>
                        <div className="inner lg:flex-grow md:w-full lg:pl-16 flex flex-col md:items-start justify-start text-start md:mb-0 items-center">
                            <p className="text-start text-[16px]  text-[#93C01F] font-[500] mb-2 w-full">{t("À propos de nous")}</p>
                            <div className='text-start rtl:md:ml-auto rtl:md:mb-6 w-full'>
                                <h1 className="text-[40px] sm:text-[56px] mb-[24px] leading-[45px] font-[700] text-[#1C2126]">{t("Qui sommes nous?")}</h1>
                            </div>
                            <p className="mb-8 text-start leading-relaxed">
                                {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad. Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.")}
                            </p>
                            <div className="flex w-full justify-center text-center md:justify-start items-end">
                                <button className="w-[100%] sm:w-[auto] text-white bg-siteblue border-0 h-[48px] px-10 focus:outline-none hover:bg-sitegreen rounded-[12px] text-[16px] font-[500] flex justify-center items-center gap-3"><span>{t("Voir Plus")}</span>  <RightIcon /></button>
                            </div>
                            <div className="flex justify-between flex-wrap items-center overflow-hidden gap-7 mt-[24px] w-full sm:w-[80%]">
                                <div className="box sm:space-y-2 align-middle sm:w-[auto]">
                                    <button className="inline-flex sm rounded-lg items-center md:ml-0 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                        <span className="text-start">
                                            <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">3600 <span className='text-[#93C01F]'> + </span></div>
                                            <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Patients Heurex")}</div>
                                        </span>
                                    </button>
                                </div>
                                <div className="box space-y-2 place-items-center">
                                    <button className="inline-flex rounded-lg items-center md:ml-0 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                        <span className="text-start">
                                            <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">1200 <span className='text-[#93C01F]'> + </span></div>
                                            <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Rendez-vous en ligne")}</div>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center overflow-hidden gap-7 mt-[48px] sm:mt-[40px] w-full sm:w-[80%]">
                                <div className="box space-y-2">
                                    <button className="inline-flex rounded-lg items-center md:ml-0 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                        <span className="text-start">
                                            {/* <div className='flex justify-center w-full'> */}
                                            <div className="w-full sm:w-[auto] font-[700] text-[32px] text-[#1C2126]">20 <span className='text-[#93C01F]'> + </span></div>
                                            {/* </div> */}
                                            <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Des années d'expérience")}</div>
                                        </span>
                                    </button>
                                </div>
                                <div className="box space-y-2">
                                    <button className="inline-flex rounded-lg items-center md:ml-0 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                                        <span className="text-start">
                                            <div className="w-full sm:w-[auto]  font-[700] text-[32px] text-[#1C2126]">200 <span className='text-[#93C01F]'> + </span></div>
                                            <div className="text-[#65737E] text-[14px] sm:text-[16px] font-[400] mt-[8px]">{t("Médecins et Cliniques")}</div>
                                        </span>
                                    </button>
                                </div>
                                {/* </div> */}
                                {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>

                    </div>
                </section>
                <section className="text-gray-600 mt-[104px] sm:mt-auto body-font girlSection">
                    <div className="container mx-auto flex px-0 sm:py-24 md:flex-row flex-col items-center flex-wrap justify-center ">
                        <div className="lg:flex-grow lg:w-1/2 flex flex-col md:items-start md:text-left sm:mb-16 md:mb-0 items-center text-center">
                            <div className='w-full md:max-w-[80%]'>
                                <p className="text-sm text-start rtl:text-end  text-[#93C01F] font-bold mb-0 w-full">{t("Notre services")}</p>
                                <h1 className="text-[31px] text-start rtl:text-end leading-[40px] md:text-[56px] md:leading-[64px] font-extrabold text-[#333B42]">{t("Nous fournissons les meilleurs service?")}</h1>
                                <p className="mt-[24px] text-start rtl:mt-4 leading-relaxed">
                                    {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad. Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.")}
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block lg:max-w-lg lg:w-full md:w-1/2 w-full">
                            <Image src={aboutimg} alt="Image of doctor" width={420} height={428.03} />
                        </div>
                    </div>
                </section >
                <section className="text-gray-600 md:px-5 lg:px-0 body-font">
                    <div className="lg:container mx-auto py-[80px]">
                        <div className="mb-16 md:mb-0 text-center flex justify-center items-center">
                            <div className='max-w-[100%]'>
                                <div className='md:flex justify-center'>
                                    <div className='w-full lg:w-[40%]'>
                                        <p className="text-[16px]  text-[#93C01F] font-[500] mb-0 w-full">{t("Témoignages")}</p>
                                        <h1 className="text-[31px] leading-[40px] md:text-[56px] mb-12 md:leading-[64px] font-extrabold text-[#333B42]">{t("Qu'ont-ils dit de nous ?")}</h1>
                                    </div>
                                </div>
                                <div className='mb-24 flex justify-center mt-[40px] px-5 sm:p-0'>
                                    <Slider {...settings} className="w-[100%] lg:max-w-[50%]">
                                        <div className='px-4'>
                                            <Row align="middle" gutter={[12, 12]} className='bg-[#93C01F] rounded-[24px] py-6 px-6'>
                                                <Col xs={24} sm={4} className='qoutes-white text-left sm:text-auto'>
                                                    <Image src={qoutesWhite} style={{ width: "100px" }} alt="White Qoutes Sign" />
                                                </Col>
                                                <Col xs={24} sm={20}>
                                                    <p className='text-left text-white text-[16px] font-[400]'>
                                                        {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad. Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.")}
                                                    </p>
                                                </Col>
                                            </Row>
                                            <div className='my-4'>
                                                <Image src={union} alt="Union" />
                                            </div>
                                            <div className='my-4 flex justify-center'>
                                                <div>
                                                    <div className='min-w-[200px] flex justify-center'>
                                                        <div className='w-[64px] h-[64px] border-2 border-[#93C01F] p-1 rounded-[50%]'>
                                                            <Image src={doctor} width={62} height={62} className="rounded-[50%]" alt="doctor" />
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <h4 className='text-[16px] font-[700] text-[#1C2126]'>Achref Maher</h4>
                                                        <p className='text-[12px]'>UIUX Designer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='px-4'>
                                            <Row align="middle" className='bg-[#93C01F] rounded-[24px] py-6 px-6'>
                                                <Col xs={24} sm={4} className='qoutes-white text-left sm:text-auto'>
                                                    <Image src={qoutesWhite} style={{ width: "100px" }} alt="White Qoutes Sign" />
                                                </Col>
                                                <Col xs={24} sm={20}>
                                                    <p className='text-left text-white text-[16px] font-[400]'>
                                                        {t("Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad. Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.")}
                                                    </p>
                                                </Col>
                                            </Row>
                                            <div className='my-4'>
                                                <Image src={union} alt="Union" />
                                            </div>
                                            <div className='my-4 flex justify-center'>
                                                <div>
                                                    <div className='min-w-[200px] flex justify-center'>
                                                        <div className='w-[64px] h-[64px] border-2 border-[#93C01F] p-1 rounded-[50%]'>
                                                            <Image src={doctor} width={62} height={62} className="rounded-[50%]" alt="doctor" />
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <h4 className='text-[16px] font-[700] text-[#1C2126]'>Achref Maher</h4>
                                                        <p className='text-[12px]'>UIUX Designer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                                <div>
                                    <div className='lg:flex justify-center'>
                                        <div className='lg:w-[40%]'>
                                            <p className="text-[16px]  text-[#93C01F] font-[500] mb-0 w-full">{t("Notre partenaires")}</p>
                                            <h1 className="text-[31px] leading-[40px] md:text-[56px] mb-12 md:leading-[64px] font-extrabold text-[#333B42]">{t("Nos partenaires de réussite")}</h1>
                                        </div>
                                    </div>
                                    <Slider {...settings2}>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                        <div>
                                            <Image src={icon1} alt="Image of doctor" />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div>
            <DownloadApp noMargin />
        </MainLayout>
    )
}

export default AboutUsPage
