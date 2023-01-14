import { Checkbox, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import SearchChips from './searchChips'
import specialitiesArray from "../../assets/specialities.json"
import statesArray from "../../assets/town_city/wilaya.json"
import citiesArray from "../../assets/town_city/communes.json"
import Image from 'next/image'
import DownArrow from "../../assets/DownArrow.svg"
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import moment from 'moment'


const { Option } = Select;

export default function SearchForm() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [selectedState, setSelectedState] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [avaialble, setAvailable] = useState('');
    const [show, setShow] = useState(false);
    const [gender, setGender] = useState("Male");
    const [searchedItems, setSearchedItems] = useState([]);
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];



    const handleStateSelection = (value) => {
        setSelectedState(value);
        // setSelectedCity('');
    }

    const handleClick = () => {
        router.push({
            pathname: '/search',
            query: { state: selectedState, city, avaialble, speciality, gender, clinicName: name }
        });
    };

    useEffect(() => {
        setSearchedItems(JSON.parse(localStorage.getItem("searchedItems")))

        return () => {

        }
    }, [])

    const handleAvailability = (val) => {
        const d = new Date();
        const dayName = days[d.getDay()];
        setAvailable(dayName);
    }

    console.log(avaialble);
    return (
        <div className='flex justify-center searchForm mx-[16px] sm:mx-0'>
            {/* max-w-md */}
            <div className="bg-white p-[28px] rounded-[20px] sm:mx-0 sm:w-[86%]  mt-[-11%]" style={{ zIndex: "1000" }}>
                <div className='mx-auto'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="block md:flex justify-around gap-[24px] mb-[24px]">
                            <div className="w-full md:w-1/4 form-group mb-4 md:mb-0">
                                <Select onChange={(val) => setSpeciality(val)} suffixIcon={<Image src={DownArrow} alt="Down Arrow" width={12} height={7} />} placeholder={t("Spécialité")} className='w-full searchFormSelect'>
                                    {specialitiesArray.map((spec) => (
                                        <Option key={spec.fr} value={spec.fr}>
                                            <div className='flex gap-2 items-center'>
                                                <div className='catImgSmall bg-white p-1 rounded-[50%]'>
                                                    <img src={i18n.language === "fr" ? spec?.img_f : spec?.img_h} className="w-[17px]" alt="Category" />
                                                </div>
                                                <div>{i18n.language === "fr" ? spec.fr : spec.ar}</div>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full md:w-1/4 form-group mb-4 md:mb-0">
                                <Select suffixIcon={<Image src={DownArrow} alt="Down Arrow" width={12} height={7} />} onChange={handleStateSelection} placeholder={t("Wilaya")} className='w-full'>
                                    {statesArray.map((state) => (
                                        <Option key={state.nom.fr} value={state.nom.fr}>{state.nom.fr}</Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full md:w-1/4 form-group mb-4 md:mb-0">
                                <Select onChange={(val) => setCity(val)} suffixIcon={<Image src={DownArrow} alt="Down Arrow" width={12} height={7} />} placeholder={t("Commune")} className='w-full'>
                                    {
                                        selectedState &&
                                        (
                                            citiesArray?.filter(c => c.wilaya_id === selectedState)?.map((city) => (
                                                <Option key={city.nom.fr} value={city.nom.fr}>{city.nom.fr}</Option>
                                            ))
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="w-full md:w-[178px] form-group">
                                <button onClick={handleClick} className="
                                homeSearchBtn
                        px-[39px]
                        py-[14px]
                        text-[16px] 
                        font-[500]
                        bg-siteblue bg-clip-padding
                        rounded-[12px]
                        transition
                        ease-in-out
                        h-[48px]
                        w-full
                        m-0
                        focus:text-[#65737E] focus:bg-white focus:border-blue-600 focus:outline-none flex justify-center gap-[5px] items-center text-white">
                                    {/* <Image style={{color: "white"}} className='absolute text-white' src={SearchIcon} alt="Search" width={32} /> */}
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.8258 0.333344C10.4058 0.333344 13.3178 3.24534 13.3178 6.82534C13.3178 8.51437 12.6696 10.0549 11.6089 11.211L13.6961 13.2938C13.8914 13.4891 13.8921 13.8051 13.6967 14.0005C13.5994 14.0991 13.4707 14.1478 13.3427 14.1478C13.2154 14.1478 13.0874 14.0991 12.9894 14.0018L10.877 11.8953C9.76584 12.7852 8.35691 13.318 6.8258 13.318C3.2458 13.318 0.33313 10.4053 0.33313 6.82534C0.33313 3.24534 3.2458 0.333344 6.8258 0.333344ZM6.8258 1.33334C3.79713 1.33334 1.33313 3.79668 1.33313 6.82534C1.33313 9.85401 3.79713 12.318 6.8258 12.318C9.8538 12.318 12.3178 9.85401 12.3178 6.82534C12.3178 3.79668 9.8538 1.33334 6.8258 1.33334Z" fill="currentColor" />
                                    </svg>

                                    <span>{t("Chercher")}</span>
                                </button>
                            </div>
                        </div>
                        <div className="form-group mb-6 ">
                            {
                                !show ?
                                    <button onClick={() => setShow(true)} className='text-[#0094DA] text-[16px] font-[500] flex'> {t("Recherche Avancée")} <span className='px-2'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M16.436 1C20.063 1 22.5 3.546 22.5 7.335V16.165C22.5 19.954 20.063 22.5 16.436 22.5H7.064C3.437 22.5 1 19.954 1 16.165V7.335C1 3.546 3.437 1 7.064 1H16.436ZM16.436 2.5H7.064C4.292 2.5 2.5 4.397 2.5 7.335V16.165C2.5 19.103 4.292 21 7.064 21H16.436C19.209 21 21 19.103 21 16.165V7.335C21 4.397 19.209 2.5 16.436 2.5ZM11.75 7.3273C12.164 7.3273 12.5 7.6633 12.5 8.0773V10.99L15.4165 10.9902C15.8305 10.9902 16.1665 11.3262 16.1665 11.7402C16.1665 12.1542 15.8305 12.4902 15.4165 12.4902L12.5 12.49V15.4043C12.5 15.8183 12.164 16.1543 11.75 16.1543C11.336 16.1543 11 15.8183 11 15.4043V12.49L8.0835 12.4902C7.6685 12.4902 7.3335 12.1542 7.3335 11.7402C7.3335 11.3262 7.6685 10.9902 8.0835 10.9902L11 10.99V8.0773C11 7.6633 11.336 7.3273 11.75 7.3273Z" fill="#0094DA" />
                                        </svg>
                                    </span>
                                    </button>
                                    :
                                    <div>
                                        <button onClick={() => setShow(false)} className='text-[#0094DA] text-[16px] font-[500] flex'> {t("Recherche Avancée")} <span className='px-2'>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M15.436 0C19.063 0 21.5 2.546 21.5 6.335V15.165C21.5 18.954 19.063 21.5 15.436 21.5H6.064C2.437 21.5 0 18.954 0 15.165V6.335C0 2.546 2.437 0 6.064 0H15.436ZM15.436 1.5H6.064C3.292 1.5 1.5 3.397 1.5 6.335V15.165C1.5 18.103 3.292 20 6.064 20H15.436C18.209 20 20 18.103 20 15.165V6.335C20 3.397 18.209 1.5 15.436 1.5Z" fill="#0094DA" />
                                                <path d="M13.3994 11.8643H8.5918C8.19629 11.8643 7.87988 11.5391 7.87988 11.1787C7.87988 10.8008 8.19629 10.4844 8.5918 10.4844H13.3994C13.7949 10.4844 14.1113 10.8008 14.1113 11.1787C14.1113 11.5391 13.7949 11.8643 13.3994 11.8643Z" fill="#0094DA" />
                                            </svg>
                                        </span>
                                        </button>
                                        <div className='flex justify-between flex-wrap items-center md:gap-[66px] mt-6 w-[45vw]'>
                                            <div>
                                                <Input onChange={(e) => setName(e.target.value)} className='min-w-[280px] bg-[#F5F8FB] rounded-[12px] border-0' placeholder={t('Nom de médecin')} />
                                            </div>
                                            <div className='flex justify-between gap-10 sm:gap-[58px] items-center mt-6 sm:mt-0'>
                                                <div className=''>
                                                    <h5 className='text-[12px] font-[500] text-[#333B42] tracking-wide'>{t("Le genre")}</h5>
                                                    <div className='flex justify-between mt-[8px] sm:mt-[14px]'>
                                                        <Checkbox className='text-[14px] font-[500] text-[#333B42] tracking-wide' value="Male" onChange={(e) => e.target.checked ? setGender(e.target.value) : setGender("")}>{t("Male")}</Checkbox>
                                                        <Checkbox className='text-[14px] font-[500] text-[#333B42] tracking-wide' value="Female" onChange={(e) => e.target.checked ? setGender(e.target.value) : setGender("")}>{t("Female")}</Checkbox>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className='text-[12px] font-[500] text-[#333B42] tracking-wide'>{t("Disponible")}</h5>
                                                    <div className='flex justify-between mt-[8px] sm:mt-[14px]'>
                                                        <Checkbox value={moment().locale("Fr").format("dddd")} onChange={(e) => e.target.checked ? handleAvailability(e.target.value) : setAvailable("")}>{t("Ouvert")}</Checkbox>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>

                        <div className='font-bold my-[16px]'>
                            <p className='text-[16px] font-[700] text-[#1C2126]'>
                                {t("Historique des recherches")}
                            </p>
                        </div>
                        <div className="flex items-center flex-wrap gap-4">
                            {/*flex flex-wrap justify-start space-x-3 space-y-3*/}
                            {
                                searchedItems && searchedItems.length > 0 ? searchedItems?.slice(0, 10)?.map(search => {
                                    return (
                                        <SearchChips chiptitle={`${search.specialisation} ${search.state}`} />
                                    )
                                })
                                    :
                                    <>
                                        <SearchChips chiptitle="Cardiologie Medea" />
                                        <SearchChips chiptitle="Medicine Interne Alger" />
                                    </>
                            }

                            {/* <SearchChips chiptitle="Pediatre Alger Borj Elkifane" />
                            <SearchChips chiptitle="Urologie Alger" /> */}
                        </div>
                    </form>
                </div >
            </div >
        </div >
    )
}
