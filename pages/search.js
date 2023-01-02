import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Checkbox, Col, Input, Pagination, Row, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../components/Auth/auth'
import SearchCard from '../components/Cards/SearchCard'
import SearchInputs from '../components/Inputs/SearchInputs'
import MainLayout from '../components/Layouts/MainLayout'
import LocationComp from '../components/Location'
import RightIcon from '../components/icons/righticon'
import { ErrorMessage } from '../components/Messages/messages'
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchWithCheckBox from '../components/Inputs/SearchWithCheckBox'
import DistanceCalculator from '../components/DistanceCalculator'
import citiesArray from "../assets/town_city/communes.json"
import SearchIcon from "../assets/search.svg"
import specialitiesArray from "../assets/specialities.json"
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const { Option } = Select;



const Search = () => {
    const { t } = useTranslation();
    const [gridCol, setGridCol] = useState(24);
    const [current, setCurrent] = useState(1);
    const [userAuth, setUserAuth] = useState();
    const [clinics, setClinics] = useState([]);
    const [speciality, setSpeciality] = useState('');
    const [clinicName, setClinicName] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [city, setCity] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [service, setService] = useState('');
    const [options, setOptions] = useState('');
    const [avaialble, setAvailable] = useState('');
    const [gender, setGender] = useState("Male");
    const [totalClinics, setTotalClinics] = useState([]);
    const [lngLat, setLngLat] = useState(null);
    const [name, setName] = useState("");
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


    useEffect(() => {
        setUserAuth(isAuthenticated());
        if (window.location.search) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/search/${current - 1}${window.location.search}`).then((response) => {
                setClinics(response.data);
            });
        } else {
            getClinics(current);
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLngLat([position.coords.longitude, position.coords.latitude]);
        });
    }, []);


    const getClinics = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/limited/${curr - 1}`).then(res => {
            if (res.statusText === "OK") {
                setClinics(res.data.clinics);
                setTotalClinics(res.data.count);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const handleSearch = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/search/${current - 1}?speciality=${speciality}&state=${selectedState}&city=${city}&available=${avaialble}&gender=${gender}&service=${service}&sortBy=${sortBy}&options=${options}&clinicName=${clinicName}`).then((response) => {
            setClinics(response.data);
            localStorage.setItem("searchedItems", JSON.stringify(response.data));
        });
    }

    const services = [
        "Abdomino-pelviene",
        "Acupuncture",
        "Allergologie",
        "Auriculothérapie",
        "Cironcision",
        "Consultation générale",
        "Consultation à domicile",
        "Cupping",
        "Diabète",
        "ECG",
        "Echographie",
        "Goitre",
        "Holter tensionnel",
        "Hypèrtension",
        "Injections",
    ]


    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <button className='prevBtn'>{t("Précédent")}</button>;
        }
        if (type === 'next') {
            return <button className='nextBtn'>{t("Suivant")}</button>;
        }
        return originalElement;
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };


    const handleChange = (value) => {
        if (city === value) {
            setCity("");
        } else {
            setCity(value);
        }
    }


    // const handleAvailability = (val) => {
    //     const d = new Date();
    //     const dayName = days[d.getDay()];
    //     setAvailable(dayName);
    // }

    return (
        <MainLayout navbar>
            <div className='SearchPage px-4 sm:px-24 py-8'>
                <div className='flex gap-2 justify-start items-center py-4'>
                    <span>{t("Accueil")}</span>
                    <RightIcon />
                    <span>{t("Cliniques")}</span>
                    <RightIcon />
                    <button className='text-[#0094DA]' href="/faq">Cardiologie</button>
                </div>
                <SearchInputs handleUpdate={(val) => setClinicName(val)} />
                <div className='flex flex-wrap justify-between items-center gap-8 mt-8'>
                    <div className='flex flex-wrap gap-8'>
                        <div className='w-[100%] sm:w-[15vw] overflow-x-auto'>
                            <div className='SelectBox relative bg-transparent'>
                                <label>{t("Commune")}</label>
                                <br />
                                <Select
                                    className='w-full'
                                    onSelect={(value) => handleChange(value)}
                                    placeholder={t("Commune")}
                                    value={city}
                                    dropdownRender={(menu) => (
                                        <div className='selectDropdown w-full p-4'>
                                            <Input
                                                suffix={<Image src={SearchIcon} alt="Search" />}
                                                placeholder="Recherche...."
                                                className='w-full'
                                                // ref={inputRef}
                                                value={name}
                                                onChange={onNameChange}
                                            />
                                            {menu}
                                        </div>
                                    )}
                                >
                                    {citiesArray?.filter(f => f?.nom?.fr?.toLowerCase().includes(name?.toLowerCase())).map((option) => (
                                        <Option key={option} value={option.nom.fr}>
                                            <Checkbox>{option.nom.fr}</Checkbox>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            {/* <SearchWithCheckBox handleUpdate={(value) => setCity(value)} prevValue={city} data={citiesArray} label="Commune" placeholder="Commune" /> */}
                        </div>
                        <div className='w-[100%] sm:w-[15vw]'>
                            <SearchWithCheckBox handleUpdate={(value) => setService(value)} data={services} label={t("Services")} placeholder={t("Services")} />
                            {
                                sortBy === "closest"
                                &&
                                <DistanceCalculator coords={[33.57577149030277, 72.99894209711883]} updateData={(val) => setClinics(val)} data={clinics} />
                            }
                        </div>
                        <div className='w-[100%] sm:w-[15vw]'>
                            <SearchWithCheckBox handleUpdate={(value) => value === "Plus de recommandation" ? setSortBy("recommendations") : value === "Le plus regardé" ? setSortBy("views") : setSortBy("closest")} data={["Plus de recommandation", "Le plus regardé", "La plus proche"]} label={t("Trier par")} placeholder={t("Trier par")} />
                        </div>
                        <div className='w-[100%] sm:w-[15vw]'>
                            <SearchWithCheckBox handleUpdate={(value) => setGender(value)} prevValue={gender} data={["Male", "Female"]} label={t("Le genre")} placeholder={t("Le genre")} />
                        </div>
                        <div className='w-[100%] sm:w-[15vw]'>
                            <SearchWithCheckBox handleUpdate={(value) => setOptions(value)} data={["GPS", "Email", "Facebook", "Instagram", "+5 Recommandations", "Ouvert"]} label={t("Options")} placeholder={t("Options")} />
                        </div>
                    </div>
                </div>
                <button onClick={handleSearch} className="mt-6 bg-[#0094DA] text-white w-full h-[48px] rounded-[16px]">{t("Chercher")}</button>
                <Row gutter={[23, 23]}>
                    <Col md={14}>
                        <h2 className='text-[16px] subTitle my-12'>{t("Recherche de")} <span className='text-[#0094DA]'>{clinicName}</span></h2>
                        <div className='flex justify-between items-center my-8'>
                            <div>{t("Nous avons trouvé")} <span className='text-[#0094DA]'>{clinics.length} - {totalClinics}</span> résultats</div>
                            <div className='hidden md:flex gap-2 items-center filterBtn'>
                                <span>{t("Affichage")}</span>
                                <div>
                                    <button className={`btn ${gridCol === 12 && "focused"}`} onClick={() => setGridCol(12)}>
                                        <AppstoreOutlined />
                                    </button>
                                </div>
                                <div>
                                    <button className={`btn ${gridCol === 24 && "focused"}`} onClick={() => setGridCol(24)}>
                                        <UnorderedListOutlined />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Row gutter={[12, 12]}>
                            {
                                clinics?.length > 0 && clinics.map(clinic => {
                                    return (
                                        <Col md={24}>
                                            <SearchCard gridCol={gridCol} page={clinic} />
                                            {/* <SearchCard removeFavourite={removeFavourite} page={fav.page} favourite={true} /> */}
                                        </Col>
                                    )
                                })
                            }
                            {/* <Col md={gridCol}>
                                <div>
                                    <SearchCard gridCol={gridCol} />
                                </div>
                            </Col>
                            <Col md={gridCol}>
                                <div>
                                    <SearchCard gridCol={gridCol} />
                                </div>
                            </Col>
                            <Col md={gridCol}>
                                <div>
                                    <SearchCard gridCol={gridCol} />
                                </div>
                            </Col>
                            <Col md={gridCol}>
                                <div>
                                    <SearchCard gridCol={gridCol} />
                                </div>
                            </Col>
                            <Col md={gridCol}>
                                <div>
                                    <SearchCard gridCol={gridCol} />
                                </div>
                            </Col> */}
                        </Row>
                        <div className='paginationCon my-12'>
                            <Pagination total={totalClinics} itemRender={itemRender} showSizeChanger={false} onChange={(curr) => { setCurrent(curr); getClinics(curr) }} />
                        </div>
                    </Col>
                    <Col md={10} className="pl-0 pt-8">
                        <div className='mapOuterContainer' style={{ height: "100%" }}>
                            <LocationComp coords={lngLat} />
                        </div>
                    </Col>
                </Row>
            </div>
        </MainLayout >
    )
}
export default Search
