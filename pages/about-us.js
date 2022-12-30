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


const AboutUsPage = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <MainLayout navbar>
            <div className='AboutUsPage container px-5 mx-auto pb-24 pt-6'>
                <div className='text-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>À propos de nous</button>
                    </div>
                    <h1 className='bigTitle'>À propos de nous</h1>
                </div>
                <AboutUs />
                <section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-0 sm:py-24 md:flex-row flex-col items-center justify-center ">
                        <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left sm:mb-16 md:mb-0 items-center text-center">
                            <div className='sm:max-w-[80%]'>
                                <p className="text-sm  text-sitegreen font-bold mb-5 w-full">Notre services</p>
                                <h1 className="bigTitle">Nous fournissons les meilleurs service?</h1>
                                <p className="mb-8 leading-relaxed">
                                    Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.
                                    Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                            <Image src={aboutimg} alt="Image of doctor" width={420} height={428.03} />
                        </div>
                    </div>
                </section >
                <section className="text-gray-600 body-font">
                    <div className="container mx-auto py-24">
                        <div className="mb-16 md:mb-0 text-center flex justify-center items-center">
                            <div className='max-w-[100%]'>
                                <p className="text-sm  text-sitegreen font-bold mb-2 w-full">Témoignages</p>
                                <h1 className="text-[46px] sm:text-[56px] mb-12 leading-[64px] font-extrabold text-gray-900">{"Qu'ont-ils"} dit de <br /> nous ?</h1>
                                <div className='mb-24 flex justify-center p-5 sm:p-0'>
                                    <Slider {...settings} className="w-[100%] sm:max-w-[50%]">
                                        <div className='px-4'>
                                            <div className='flex items-center flex-wrap gap-4 bg-[#93C01F] rounded-[24px] py-6 px-6'>
                                                <div className='qoutes-white'>
                                                    <Image src={qoutesWhite} style={{ width: "100px" }} alt="White Qoutes Sign" />
                                                </div>
                                                <div>
                                                    <p className='text-left text-white text-[16px] font-[400]'>
                                                        Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                                                    </p>
                                                </div>
                                            </div>
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
                                            <div className='flex flex-wrap items-center gap-4 bg-[#93C01F] rounded-[24px] py-6 px-6'>
                                                <div className='qoutes-white'>
                                                    <Image src={qoutesWhite} style={{ width: "100px" }} alt="White Qoutes Sign" />
                                                </div>
                                                <div>
                                                    <p className='text-left text-white text-[16px] font-[400]'>
                                                        Lörem ipsum prektigt beren makroligt, till desena. Lasock heterok. Nir nist så keltisk tiger usat fast bior. Rebel nedyn prertad krod semigon. Rest reska inte eubel sasade. Du kan vara drabbad.  Ananade krogogt fulparkerare. Speskade syll men polylunat biortad. Hell dede. Kasa keredybär.
                                                    </p>
                                                </div>
                                            </div>
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
                                    <p className="text-sm  text-sitegreen font-bold mb-2 w-full">Notre partenaires</p>
                                    <h1 className="text-[46px] sm:text-[56px] mb-12 leading-[64px] font-extrabold text-gray-900">Nos partenaires <br /> de réussite</h1>
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
