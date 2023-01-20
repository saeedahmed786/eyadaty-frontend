import { Checkbox, Col, Form, Input, Radio, Row, Select, Tooltip, Upload } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { ArrowUpOutlined, DeleteFilled, EnvironmentOutlined, InfoCircleFilled } from '@ant-design/icons'
import RightIcon from '../../components/icons/righticon'
import SelectBoxWidthSearch from '../../components/Inputs/SelectBox'
import ProfileSelectBox from '../../components/Profile/ProfileSelectBox'
import ProfileIcon from '../../assets/gallery.svg';
import UploadIcon from '../../assets/upload.svg'
import galleryIcon from '../../assets/galleryIcon.svg';
import NotesModal from '../../components/Admin/NotesModal'
import ServicesModal from '../../components/Admin/ServicesModel'
import axios from 'axios'
import { isAuthenticated } from '../../components/Auth/auth'
import specialitiesArray from "../../assets/specialities.json"
import typeArray from "../../assets/type_profile.json"
import { deleteFilesFun, uploadFilesFun } from '../../components/UploadFile'
import closeIcon from "../../assets/closeIcon.svg"
import { Loading } from '../../components/Loading/Loading'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import { useTranslation } from 'react-i18next'
import statesArray from "../../assets/town_city/wilaya.json"
import citiesArray from "../../assets/town_city/communes.json"

const { Option } = Select;

const CreatePage = () => {
    const { t, i18n } = useTranslation();
    const [filesList, setFilesList] = useState([]);
    const [file, setFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState("Male");
    const [owner, setOwner] = useState("Yes");
    const [uploadedFilesList, setUploadedFilesList] = useState([]);
    const [profileFile, setProfileFile] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [form] = Form.useForm();
    const [userAuth, setUserAuth] = useState({});
    const [status, setStatus] = useState("Pending");
    const [paidStatus, setPaidStatus] = useState("Free");
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Handle state selection
    const handleStateSelection = (value) => {
        setSelectedState(value);
        setSelectedCity('');
    }


    useEffect(() => {
        setTimeout(() => {
            setUserAuth(isAuthenticated());
        }, 1000);

        return () => {

        }
    }, [])


    const onFinish = async (values) => {
        const {
            email,
            firstName,
            lastName,
            type,
            phone,
            phoneTwo,
            fax,
            facebookLink,
            instagram,
            twitter,
            messenger,
            bio,
            specialisation,
            experience,
            clinicName,
            gpsData,
            gender,
            state,
            city,
            fullAddress
        } = values;

        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/admin/add`, {
            email,
            firstName,
            lastName,
            type,
            phone,
            phoneTwo,
            fax,
            facebookLink,
            instagram,
            twitter,
            messenger,
            bio,
            specialisation,
            experience,
            clinicName,
            gpsData,
            owner,
            gender,
            filesList: uploadedFilesList,
            profileFile,
            notes: selectedNotes,
            services: selectedServices,
            schedule,
            category: categoryId,
            status,
            paidStatus,
            state,
            city,
            fullAddress
        }, {
            headers: {
                "authorization": "Bearer " + userAuth?.token
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.statusText === "OK") {
                // getUserPageById(userAuth);
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };


    const getAllCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }



    useEffect(() => {
        getAllCategories()
        return () => {
        }
    }, []);

    const handleFilesUpload = (f) => {
        uploadFilesFun(f, userAuth?.token).then(res => {
            setUploadedFilesList([...uploadedFilesList, res])
        })
    }

    const handleProfileFileUpload = (f) => {
        uploadFilesFun(f, userAuth?.token).then(res => {
            setProfileFile(res)
        })
    }


    const handleFileRemove = (d) => {
        deleteFilesFun(d, userAuth?.token).then(res => {
            if (res) {
                setUploadedFilesList(uploadedFilesList.filter(f => f?.id !== d?.id));
            }
        })
    }

    const handleSchedule = (opening, closing, label) => {
        if (schedule.length === 0) {
            setSchedule(schedule.concat({ day: label, open: opening, close: closing }))
        } else {
            setSchedule(prevItems => [...prevItems, { day: label, open: opening, close: closing }]);
        }
    }

    const customTooltipFrance = `
    <div>
    <p>Veuillez prendre en considération les remarques suivantes :</p>
    <ul>
    <li>Veuillez sélectionner le premier jour normal de la semaine.</li>
    <li>Déterminer la nature du travail, qu'il s'agisse d'un travail continu ou d'une période de repos.</li>
    <li>Déterminez les périodes du matin et du soir.</li>
    <li>Lorsque le premier jour normal est terminé. Veuillez cliquer sur le reste des jours et les horaires de travail seront copiés.</li>
    <li>Cliquez sur les jours exceptionnels et ajustez les horaires de travail.</li>
    </ul>
    </div>`

    const customTooltipArabic = `
    <div>
    <p>يرجى النظر في الملاحظات التالية:</p>
    <ul>
    <li>الرجاء تحديد اليوم العادي الأول من الأسبوع.</li>
    <li>تحديد طبيعة العمل سواء كان عمل مستمر أو فترة راحة.</li>
    <li>تحديد فترات الصباح والمساء.</li>
    <li>عندما ينتهي اليوم الأول العادي. الرجاء الضغط على باقي الأيام وسيتم نسخ ساعات العمل.</li>
    <li>انقر فوق أيام استثنائية وضبط ساعات العمل.</li>
    </ul>
    </div>`

    const gpsCustomTooltip = `
    <div>
    <p>Veuillez suivre les quatre étapes suivantes :</p>
    <ul>
    <li>1 - Activez la fonction de localisation sur Google Map.</li>
    <li>2 - Déterminez un point de repère en cliquant quelques secondes sur l'emplacement de votre clinique sur la carte.</li>
    <li>3 - Copiez les données GPS affichées dans les informations de localisation.</li>
    <li>4 - Collez les données dans le champ spécifié.</li>
    </ul>
    </div>`
    const gpsCustomTooltipArabic = `
    <div>
    <p>برجاء اتباع الخطوات الأربع التالية:</p>
    <ul>
    <li>1 - تفعيل وظيفة الموقع على خريطة جوجل.</li>
    <li>1 - تفعيل وظيفة الموقع على خريطة جوجل.</li>
    <li>3 - انسخ بيانات GPS المعروضة في معلومات الموقع.</li>
    <li>4 - الصق البيانات في الحقل المحدد.</li>
    </ul>
    </div>`
    const notesToolip = `
    <div>
    <p>Veuillez inclure des notes sur le fonctionnement de votre clinique, telles que : consultation sur rendez-vous seulement ou consultation par rôle.</p>
    </div>`
    const notesToolipArabic = `
    <div>
    <p>يرجى تضمين ملاحظات حول كيفية عمل عيادتك ، مثل: الاستشارة عن طريق التعيين فقط أو الاستشارة حسب الدور.</p>
    </div>`

    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='md:flex justify-between items-center'>
                    <div>
                        <div className='flex gap-2 justify-start items-center py-4'>
                            <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("Créer un page")}</button>
                        </div>
                        <h1 className='bigTitle'>{t("Créer un page")}</h1>
                    </div>
                    {/* <div className='mt-6 md:mt-0'>
                        <button className='flex items-center justify-center w-full gap-2 bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6'>
                            <PlusIcon />
                            <span className='text-[16px] font-[500]'>{t("Ajouter un page")}</span>
                        </button>
                    </div> */}
                </div>
                <div className='md:max-w-[40vw]'>
                    <div className='mt-12'>
                        <SelectBoxWidthSearch prevValue={categoryId} data={specialitiesArray} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                    </div>
                    <div className='flex justify-between flex-wrap gap-6 mt-6'>
                        <div>
                            <h5>{t("Type de page")}</h5>
                            <div className='flex justify-between gap-6 mt-3'>
                                <Checkbox value="Free" checked={paidStatus === "Free"} onChange={(e) => setPaidStatus(e.target.value)}>Freemium</Checkbox>
                                <Checkbox value="Premium" checked={paidStatus === "Premium"} onChange={(e) => setPaidStatus(e.target.value)}>Premium</Checkbox>
                            </div>
                        </div>
                        <div>
                            <h5>{t("Actif")}</h5>
                            <div className='flex justify-between gap-6 mt-3'>
                                <Checkbox value="Active" checked={status === "Active"} onChange={(e) => setStatus(e.target.value)}>{t("Activé")}</Checkbox>
                                <Checkbox value="Pending" checked={status === "Pending"} onChange={(e) => setStatus(e.target.value)}>{t("En attente")}</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='CreatePage'>
                    <div className='mt-8'>
                        <div className='pictureUploadContainer'>{t("Image de profile")}</div>
                        <div className='flex flex-wrap gap-4 items-center mt-4'>
                            {
                                profileFile && profileFile?.url ?
                                    <img src={profileFile?.url} className="rounded-[50%] h-[80px]" width={80} alt="Profile" />
                                    :
                                    <Image src={ProfileIcon} width={80} alt="Profile" />
                            }
                            <div className='w-full sm:w-auto flex gap-4'>
                                <div className='relative'>
                                    <span className="btn btn-primary btn-file">
                                        <button className='uploadBtn flex items-center gap-2'>
                                            <span>{t("Ajouter un image")}</span>
                                            <span className='arrowUp'><ArrowUpOutlined /></span>
                                            <input type="file" name='file' onChange={(e) => handleProfileFileUpload(e.target.files[0])} />
                                        </button>
                                    </span>
                                </div>
                                <div>
                                    <span className="btn btn-primary btn-file">
                                        <button className='deleteBtn'>
                                            <span>{t("Supprimer")}</span>
                                            <input onChange={(e) => handleProfileFileUpload(e.target.files[0])} accept="image/*" name='file' type="file" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            loading ?
                                <Loading />
                                :
                                <Form
                                    form={form}
                                    name="register"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                    className='mt-10'
                                >
                                    <Form.Item
                                        name="type"
                                        label={t("Type de page")}
                                        requiredMark={"*"}
                                        required
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Type de page!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder={t("Type de page")}>
                                            {
                                                typeArray?.length > 0 && typeArray.map(t => {
                                                    return (
                                                        <Option value={t.name_fr}>{t.name_fr}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="lastName"
                                                label={t("Nom")}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Nom!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={t('Nom')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="firstName"
                                                label={t("Prénom")}
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Prénom!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder={t('Prénom')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item name="gender" label={t("Gender")}>
                                        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                                            <Radio value="Male">{t("Male")}</Radio>
                                            <Radio value="Female">{t("Female")}</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="phone"
                                        label={t("Numéro de Téléphone")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Numéro de Téléphone!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder={t('Numéro de Téléphone')} prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="phoneTwo"
                                        label={t("Numéro de Téléphone 02 ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Numéro de Téléphone 02 ( Optionnel )!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder={t('Numéro de Téléphone 02 ( Optionnel )')} prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="fax"
                                        label={t("Numéro de Téléphone Fixe ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Numéro de Téléphone Fixe ( Optionnel )!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder={t('Numéro de Téléphone Fixe ( Optionnel )')} prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label={t("E-mail")}
                                        required
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'email',
                                                message: "Format d'e-mail incorrect",
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t('E-mail')} />
                                    </Form.Item>
                                    <Form.Item
                                        name="facebookLink"
                                        label={t("Lien de Facebook  ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Lien de Facebook  ( Optionnel )!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t("Lien de Facebook  ( Optionnel )")} />
                                    </Form.Item>
                                    <Form.Item
                                        name="instagram"
                                        label={t("Lien de Instagram  ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Lien de Instagram  ( Optionnel )!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t("Lien de Instagram  ( Optionnel )")} />
                                    </Form.Item>
                                    <Form.Item
                                        name="twitter"
                                        label={t("Lien de Twitter  ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Lien de Twitter  ( Optionnel )!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t("Lien de Twitter  ( Optionnel )")} />
                                    </Form.Item>
                                    <Form.Item
                                        name="messenger"
                                        label={t("Lien de Messenger  ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Lien de Messenger  ( Optionnel )!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t("Lien de Messenger  ( Optionnel )")} />
                                    </Form.Item>
                                    <Form.Item
                                        name="bio"
                                        label={t("Bio ( Optionnel )")}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input Bio ( Optionnel )',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea placeholder={t("Bio")} rows={6} showCount maxLength={100} />
                                    </Form.Item>
                                    <Form.Item
                                        name="specialisation"
                                        label={t("Spécialité")}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Spécialité!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder={t("Spécialité")}>
                                            {specialitiesArray.map((spec) => (
                                                <Option key={spec.fr} value={spec.fr}>{spec.fr}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="experience"
                                        label={t("Experience")}
                                        required
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Experience!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t("Experience")} />
                                    </Form.Item>
                                    <div className='my-4 md:max-w-[60%]'>
                                        {
                                            schedule.length > 0 &&
                                            <table className='w-full text-center my-5 border'>
                                                <thead className='py-4'>
                                                    <th>Day</th>
                                                    <th>Opening Time</th>
                                                    <th>Closing Time</th>
                                                    <th>Delete</th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        schedule.map(sch => {
                                                            return (
                                                                <tr>
                                                                    <td>{t(sch?.day)}</td>
                                                                    <td>{sch?.open}</td>
                                                                    <td>{sch?.close}</td>
                                                                    <td><DeleteFilled onClick={() => setSchedule(schedule.filter(f => f.day !== sch.day))} /></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        }
                                        <label className='flex gap-2 mb-4 items-center'>
                                            <span>{t("Horaire de travail")}</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <Tooltip title={<div dangerouslySetInnerHTML={{ __html: i18n.language === "fr" ? customTooltipFrance : customTooltipArabic }}></div>}> <InfoCircleFilled className="text-[#0094DA]" /></Tooltip>
                                        </label>
                                        <ProfileSelectBox label={t("Samedi")} saveItem={handleSchedule} />
                                        <ProfileSelectBox label={t("Dimanche")} saveItem={handleSchedule} />
                                        <ProfileSelectBox label={t("Lundi")} saveItem={handleSchedule} />
                                        <ProfileSelectBox label={t("Mardi")} saveItem={handleSchedule} />
                                        <ProfileSelectBox label={t("Mercredi")} saveItem={handleSchedule} />
                                        <ProfileSelectBox label={t("Jeudi")} saveItem={handleSchedule} />
                                    </div>
                                    <label className='flex gap-2 mb-4 items-center'>
                                        <h4 style={{ fontWeight: "700", fontSize: "16px" }}>{t("Les notes ( Optionnel )")}</h4>
                                        <span className='text-[#FF6551]'>*</span>
                                        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: i18n.language === "fr" ? notesToolip : notesToolipArabic }}></div>}> <InfoCircleFilled className="text-[#0094DA]" /></Tooltip>
                                    </label>
                                    <Form.Item
                                        name="notes"
                                        // label={t("Les notes ( Optionnel )")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Les notes ( Optionnel )!',
                                            }
                                        ]}
                                    >
                                        <NotesModal updatedItems={selectedNotes} title="Ajouter une note" handleUpdate={(value) => setSelectedNotes(value)} />
                                    </Form.Item>
                                    <div>
                                        <ul>
                                            {
                                                selectedNotes?.length > 0 && selectedNotes.map(note => {
                                                    return (
                                                        <li className='p-4 bg-[#F5F8FB] mb-4 rounded-[8px] h-[48px] flex justify-between items-center'>
                                                            <span className='text-[16px] font-[500]'>{t(note)}</span>
                                                            <span className='pointer' onClick={() => setSelectedNotes(prevItems => prevItems.filter(item => item !== note))}>
                                                                <Image src={closeIcon} alt="Icon" />
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <Form.Item
                                        name="clinicName"
                                        label={t("Nom de la clinique ( Optionnel )")}
                                        hasFeedback
                                    >
                                        <Input placeholder={t("Nom de la clinique ( Optionnel )")} />
                                    </Form.Item>
                                    <Row gutter={[23, 10]}>
                                        <Col xs={24}>
                                            <label className='flex gap-2 mb-0 items-center'>
                                                <span className='font-[700] leading-[16px]'>{t("Adresse de la clinique")}</span>
                                                <span className='text-[#FF6551]'>*</span>
                                            </label>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="state"
                                                label={t("Wilaya")}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select wilaya!',
                                                    },
                                                ]}
                                            >
                                                <Select onChange={handleStateSelection} placeholder={t("Wilaya")}>
                                                    {statesArray && statesArray?.length > 0 && statesArray?.map((state) => (
                                                        <Option key={state.nom.fr} value={state.nom.fr}>{state.nom.fr}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="city"
                                                label={t("Commune")}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please select Commune!',
                                                    },
                                                ]}
                                            >
                                                <Select placeholder={t("Commune")}>
                                                    {
                                                        selectedState &&
                                                        (
                                                            citiesArray && citiesArray?.length > 0 && citiesArray?.filter(c => c.wilaya_id === selectedState)?.map((city) => (
                                                                <Option key={city.nom.fr} value={city.nom.fr}>{city.nom.fr}</Option>
                                                            ))
                                                        )
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item
                                                label={t("Adresse de la clinique")}
                                                name="fullAddress"
                                                required
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your address!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Adresse de la clinique' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className='mt-4'>
                                        <label className='flex gap-2 mb-4 items-center'>
                                            <span className='font-[700] leading-[16px]'>{t("Les données de GPS")}</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <Tooltip overlayClassName='gpsTooltip' title={<div dangerouslySetInnerHTML={{ __html: i18n.language === "fr" ? gpsCustomTooltip : gpsCustomTooltipArabic }}></div>}> <InfoCircleFilled className="text-[#0094DA]" /></Tooltip>
                                        </label>
                                        <label>{t("Code GPS")}</label>
                                        <Row align={"center"} gutter={[16, 16]}>
                                            <Col xs={19}>
                                                <Form.Item
                                                    name="gpsData"
                                                    required
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your Code GPS!',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder='Ex : 36.267845, 2.711350' />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={5}>
                                                <button className='bg-[#0094DA] rounded-[12px] w-[48px] h-[48px] flex justify-center items-center'>
                                                    <EnvironmentOutlined className='text-white' style={{ fontSize: "19px" }} />
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <span className='font-[700] leading-[16px]'>{t("Services")}</span>
                                        <Form.Item
                                            name="services"
                                            // label={t("Services")}
                                            className='mt-2'
                                            hasFeedback
                                            requiredMark
                                            required
                                            rules={[
                                                {
                                                    required: false,
                                                    message: 'Please input your Services!',
                                                }
                                            ]}
                                        >
                                            <ServicesModal updatedItems={selectedServices} handleUpdate={(value) => setSelectedServices(value)} />
                                        </Form.Item>
                                    </div>
                                    <div>
                                        <ul>
                                            {
                                                selectedServices?.length > 0 && selectedServices.map(service => {
                                                    return (
                                                        <li className='p-4 bg-[#F5F8FB] mb-4 rounded-[8px] h-[48px] flex justify-between items-center'>
                                                            <span className='text-[16px] font-[500]'>{t(service)}</span>
                                                            <span className='pointer' onClick={() => setSelectedServices(prevItems => prevItems.filter(item => item !== service))}>
                                                                <Image src={closeIcon} alt="Icon" />
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <Form.Item>
                                        <label className='pb-5'>
                                            <span className='font-[700] leading-[16px]'>{t("Image de clinique")}</span>
                                            <span className='text-[#FF6551] px-1'>*</span>
                                        </label>
                                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                            <Upload.Dragger style={{ marginTop: "16px" }} fileList={filesList} showUploadList={false} onChange={(e) => { handleFilesUpload(e.file.originFileObj); setFilesList(e.fileList); }} height={148}>
                                                <p className="mb-0">
                                                    <Image src={UploadIcon} alt="Upload Icon" />
                                                </p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                        <p className='text-center text-[#65737E] leading-[17px] mt-2'>{t("Essayez de télécharger l'image dans ces formats ( PNG, JPEG )")}</p>
                                    </Form.Item>
                                    <div className='my-4'>
                                        <div className='flex flex-wrap gap-6 mt-8'>
                                            {
                                                uploadedFilesList?.length > 0 ? uploadedFilesList.map(file => {
                                                    return (
                                                        <div className='imageBox relative sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <img src={file?.url} className="rounded-[12px] border h-[132px] w-[148px]" alt="Gallery Icon" />
                                                            <DeleteFilled className='absolute top-[-8px] right-0' onClick={() => handleFileRemove(file)} />
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    <>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox sm:w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label className='flex gap-1 mb-4 items-center'>
                                            <span className='font-[700] leading-[16px]'>{t("Êtes-vous le propriétaire de la clinique?")}</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <InfoCircleFilled className="text-[#0094DA]" />
                                        </label>
                                        <div className='mt-0 flex items-center gap-4'>
                                            <Checkbox checked={owner === "Yes"} onChange={(e) => e.target.checked && setOwner("Yes")}>{t("Oui")}</Checkbox>
                                            <Checkbox checked={owner === "No"} onChange={(e) => e.target.checked && setOwner("No")}>{t("Non")}</Checkbox>
                                        </div>
                                    </div>
                                    <Form.Item className='my-5'>
                                        <div className='flex gap-4'>
                                            <button type="submit" className='btn px-12 bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                                {t("Sauvegarder")}
                                            </button>
                                            <button className='btn px-12 bg-[#C0C5CE] rounded-[12px] text-black font-[500] leading-[16px] h-[56px]'>
                                                {t("Annuler")}
                                            </button>
                                        </div>
                                    </Form.Item>
                                </Form>
                        }
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default CreatePage
