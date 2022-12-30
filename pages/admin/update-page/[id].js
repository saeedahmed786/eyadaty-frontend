import { Checkbox, Col, Form, Input, Radio, Row, Select, Upload } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/Layouts/Admin/AdminLayout'
import { ArrowUpOutlined, DeleteFilled, EnvironmentOutlined, InfoCircleFilled } from '@ant-design/icons'
import RightIcon from '../../../components/icons/righticon'
import PlusIcon from '../../../components/icons/plusIcon'
import SelectBoxWidthSearch from '../../../components/Inputs/SelectBox'
import ProfileSelectBox from '../../../components/Profile/ProfileSelectBox'
import ProfileIcon from '../../../assets/gallery.svg';
import UploadIcon from '../../../assets/upload.svg'
import galleryIcon from '../../../assets/galleryIcon.svg';
import { isAuthenticated } from '../../../components/Auth/auth'
import { ErrorMessage, SuccessMessage } from '../../../components/Messages/messages'
import axios from 'axios'
import NotesModal from '../../../components/Admin/NotesModal'
import ServicesModal from '../../../components/Admin/ServicesModel'
import { Loading } from '../../../components/Loading/Loading'
import closeIcon from '../../../assets/closeIcon.svg'
import { deleteFilesFun, uploadFilesFun } from '../../../components/UploadFile'
import specialitiesArray from "../../../assets/specialities.json"
import typeArray from "../../../assets/type_profile.json"


const { Option } = Select;

const UpdatePage = () => {
    const [filesList, setFilesList] = useState([]);
    const [pageId, setPageId] = useState("");
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState("Male");
    const [owner, setOwner] = useState("Yes");
    const [status, setStatus] = useState("Pending");
    const [paidStatus, setPaidStatus] = useState("Free");
    const [categoryId, setCategoryId] = useState("");
    const [uploadedFilesList, setUploadedFilesList] = useState([]);
    const [profileFile, setProfileFile] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [form] = Form.useForm();
    const [userAuth, setUserAuth] = useState({});


    useEffect(() => {
        setPageId(window.location.pathname.split("page/")[1])
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
            bio,
            specialisation,
            experience,
            clinicName,
            gpsData,
            gender,
        } = values;

        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/update/${pageId}`, {
            email,
            firstName,
            lastName,
            type,
            phone,
            phoneTwo,
            fax,
            facebookLink,
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
            paidStatus,
            status,
            state: isAuthenticated().state,
            city: isAuthenticated().city,
        }, {
            headers: {
                "authorization": "Bearer " + userAuth?.token
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.statusText === "OK") {
                getUserPageById(pageId);
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

    const getUserPageById = async (id) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/get/${id}`, {
            headers: {
                "authorization": "Bearer " + userAuth?.token
            }
        }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                form.setFieldsValue({
                    type: res.data?.type,
                    email: res.data?.email,
                    firstName: res.data?.firstName,
                    lastName: res.data?.lastName,
                    phone: res.data?.phone,
                    phoneTwo: res.data?.phoneTwo,
                    fax: res.data?.fax,
                    bio: res.data?.bio,
                    facebookLink: res.data?.facebookLink,
                    specialisation: res.data?.specialisation,
                    experience: res.data?.experience,
                    clinicName: res.data?.clinicName,
                    gpsData: res.data?.gpsData,
                    clinicName: res.data?.clinicName,
                    gender: res.data?.gender,
                });
                setOwner(res.data?.owner);
                setSchedule(res.data?.schedule);
                setCategoryId(res.data?.category?._id);
                setStatus(res.data?.status);
                setPaidStatus(res.data?.paidStatus);
                setSelectedNotes(res.data?.notes);
                setSelectedServices(res.data?.services);
                setProfileFile(res.data?.picture);
                setUploadedFilesList(res.data?.pictures)
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        setTimeout(() => {
            getUserPageById(window.location.pathname.split("page/")[1]);
        }, 1000);

        return () => {

        }
    }, []);


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


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='md:flex justify-between flex-wrap gap-4'>
                    <div>
                        <div className='flex gap-2 justify-start items-center pb-4'>
                            <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Modifier la page</button>
                        </div>
                        <h1 className='bigTitle'>Modifier la page</h1>
                    </div>
                    <div className='mt-8 md:mt-0'>
                        <button className='flex justify-center items-center w-full gap-2 bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6'>
                            <PlusIcon />
                            <span className='text-[16px] font-[500]'>Ajouter un page</span>
                        </button>
                    </div>
                </div>
                <div className='md:max-w-[40vw]'>
                    <div className='mt-12'>
                        <SelectBoxWidthSearch prevValue={categoryId} data={categories} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                    </div>
                    <div className='flex justify-between flex-wrap gap-6 mt-6'>
                        <div>
                            <h5>Type de page</h5>
                            <div className='flex justify-between gap-6 sm:gap-0 mt-3'>
                                <Checkbox value="Free" checked={paidStatus === "Free"} onChange={(e) => setPaidStatus(e.target.value)}>Freemium</Checkbox>
                                <Checkbox value="Premium" checked={paidStatus === "Premium"} onChange={(e) => setPaidStatus(e.target.value)}>Premium</Checkbox>
                            </div>
                        </div>
                        <div>
                            <h5>Actif</h5>
                            <div className='flex justify-between gap-6 sm:gap-0 w-full mt-3'>
                                <Checkbox value="Active" checked={status === "Active"} onChange={(e) => setStatus(e.target.value)}>Activé</Checkbox>
                                <Checkbox value="Pending" checked={status === "Pending"} onChange={(e) => setStatus(e.target.value)}>En attente</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='CreatePage'>
                    <div className='mt-8'>
                        <div className='pictureUploadContainer'>Image de profile</div>
                        {/* <div className='flex gap-4 items-center mt-4'>
                            {
                                profileFile && profileFile?.url ?
                                    <img src={profileFile?.url} className="rounded-[50%]" width={80} alt="Profile" />
                                    :
                                    <Image src={ProfileIcon} width={80} alt="Profile" />
                            }
                            <div className='relative'>
                                <span className="btn btn-primary btn-file">
                                    <button className='uploadBtn flex items-center gap-2'>
                                        <span>Ajouter un image</span>
                                        <span className='arrowUp'><ArrowUpOutlined /></span>
                                        <input type="file" name='file' onChange={(e) => handleProfileFileUpload(e.target.files[0])} />
                                    </button>
                                </span>
                            </div>
                            <div>
                                <span className="btn btn-primary btn-file">
                                    <button className='deleteBtn'>
                                        <span>Supprimer</span>
                                        <input onChange={(e) => handleProfileFileUpload(e.target.files[0])} accept="image/*" name='file' type="file" />
                                    </button>
                                </span>
                            </div>
                        </div> */}
                        <div className='flex flex-wrap gap-4 items-center mt-4'>
                            {
                                profileFile && profileFile?.url ?
                                    <img src={profileFile?.url} className="rounded-[50%] h-[80px]" width={80} alt="Profile" />
                                    :
                                    <Image src={ProfileIcon} width={80} alt="Profile" />
                            }
                            {/* <Image src={ProfileIcon} width={80} alt="Profile" /> */}
                            <div className='w-full sm:w-auto flex gap-4'>
                                <div className='relative'>
                                    <span className="btn btn-primary btn-file">
                                        <button className='uploadBtn flex items-center gap-2'>
                                            <span>Ajouter un image</span>
                                            <span className='arrowUp'><ArrowUpOutlined /></span>
                                            <input type="file" name='file' onChange={(e) => handleProfileFileUpload(e.target.files[0])} />
                                        </button>
                                    </span>
                                </div>
                                <div>
                                    <span className="btn btn-primary btn-file">
                                        <button className='deleteBtn'>
                                            <span>Supprimer</span>
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
                                        label="Type de page"
                                        requiredMark={"*"}
                                        required
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Type de page!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Type de page">
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
                                                label="Nom"
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Nom!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Nom' />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="firstName"
                                                label="Prénom"
                                                hasFeedback
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Prénom!',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder='Prénom' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item name="gender" label="Gender">
                                        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        name="phone"
                                        label="Numéro de Téléphone"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Numéro de Téléphone!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Numéro de Téléphone' prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="phoneTwo"
                                        label="Numéro de Téléphone 02 ( Optional )"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Numéro de Téléphone 02 ( Optional )!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Numéro de Téléphone 02 ( Optional )' prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="fax"
                                        label="Numéro de Téléphone Fixe ( Optional )"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Numéro de Téléphone Fixe ( Optional )!',
                                            }
                                        ]}
                                    >
                                        <Input placeholder='Numéro de Téléphone Fixe ( Optional )' prefix={"+213"} />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        label="E-mail"
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
                                        <Input placeholder='E-mail' />
                                    </Form.Item>
                                    <Form.Item
                                        name="facebookLink"
                                        label="Lien de Facebook  ( Optional )"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Lien de Facebook  ( Optional )!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Lien de Facebook  ( Optional )' />
                                    </Form.Item>
                                    <Form.Item
                                        name="bio"
                                        label="Bio ( Optional )"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input Bio ( Optional )',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea placeholder='Bio' rows={6} showCount maxLength={100} />
                                    </Form.Item>
                                    <Form.Item
                                        name="specialisation"
                                        label="Spécialité"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Spécialité!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Spécialité">
                                            {specialitiesArray.map((spec) => (
                                                <Option key={spec.fr} value={spec.fr}>{spec.fr}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="experience"
                                        label="Experience"
                                        required
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Experience!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Experience' />
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
                                                                    <td>{sch?.day}</td>
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
                                            <span>Horaire de travail</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <InfoCircleFilled className="text-[#0094DA]" />
                                        </label>
                                        <ProfileSelectBox label="Samedi" saveItem={handleSchedule} />
                                        <ProfileSelectBox label="Dimanche" saveItem={handleSchedule} />
                                        <ProfileSelectBox label="Lundi" saveItem={handleSchedule} />
                                        <ProfileSelectBox label="Mardi" saveItem={handleSchedule} />
                                        <ProfileSelectBox label="Mercredi" saveItem={handleSchedule} />
                                        <ProfileSelectBox label="Jeudi" saveItem={handleSchedule} />
                                    </div>
                                    <Form.Item
                                        name="notes"
                                        label="Les notes ( Optional )"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Les notes ( Optional )!',
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
                                                            <span className='text-[16px] font-[500]'>{note}</span>
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
                                        label="Nom de la clinique ( Optional )"
                                        hasFeedback
                                    >
                                        <Input placeholder='Nom de la clinique' />
                                    </Form.Item>
                                    <div className='mt-4'>
                                        <label className='flex gap-2 mb-4 items-center'>
                                            <span className='font-[700] leading-[16px]'>Horaire de travail</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <InfoCircleFilled className="text-[#0094DA]" />
                                        </label>
                                        <label>Code GPS</label>
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
                                    <Form.Item
                                        name="services"
                                        label="Services"
                                        className='mt-2'
                                        hasFeedback
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Please input your Services!',
                                            }
                                        ]}
                                    >
                                        <ServicesModal updatedItems={selectedServices} handleUpdate={(value) => setSelectedServices(value)} />
                                    </Form.Item>
                                    <div>
                                        <ul>
                                            {
                                                selectedServices?.length > 0 && selectedServices.map(service => {
                                                    return (
                                                        <li className='p-4 bg-[#F5F8FB] mb-4 rounded-[8px] h-[48px] flex justify-between items-center'>
                                                            <span className='text-[16px] font-[500]'>{service}</span>
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
                                        <label>
                                            <span className='font-[700] leading-[16px]'>Horaire de travail</span>
                                            <span className='text-[#FF6551] px-1'>*</span>
                                        </label>
                                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                            <Upload.Dragger fileList={filesList} showUploadList={false} onChange={(e) => { handleFilesUpload(e.file.originFileObj); setFilesList(e.fileList); }} height={148}>
                                                <p className="mb-0">
                                                    <Image src={UploadIcon} alt="Upload Icon" />
                                                </p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                        <p className='text-center text-[#65737E] leading-[17px] mt-2'>{"Essayez de télécharger l'image dans ces formats ( PNG, JPEG )"}</p>
                                    </Form.Item>
                                    <div className='my-4'>
                                        <div className='flex flex-wrap gap-6 mt-8'>
                                            {
                                                uploadedFilesList?.length > 0 ? uploadedFilesList.map(file => {
                                                    return (
                                                        <div className='imageBox relative w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <img src={file?.url} className="rounded-[12px] border h-[132px] w-[148px]" alt="Gallery Icon" />
                                                            <DeleteFilled className='absolute top-[-8px] right-0' onClick={() => handleFileRemove(file)} />
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    <>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                        <div className='imageBox w-[166px] h-[148px] rounded-[12px] border flex justify-center items-center'>
                                                            <Image src={galleryIcon} alt="Gallery Icon" />
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label className='flex gap-1 mb-4 items-center'>
                                            <span className='font-[700] leading-[16px]'>Êtes-vous le propriétaire de la clinique?</span>
                                            <span className='text-[#FF6551]'>*</span>
                                            <InfoCircleFilled className="text-[#0094DA]" />
                                        </label>
                                        <div className='mt-0 flex items-center gap-4'>
                                            <Checkbox checked={owner === "Yes"} onChange={(e) => e.target.checked && setOwner("Yes")}>Oui</Checkbox>
                                            <Checkbox checked={owner === "No"} onChange={(e) => e.target.checked && setOwner("No")}>Non</Checkbox>
                                        </div>
                                    </div>
                                    <Form.Item className='my-5'>
                                        <div className='flex gap-4'>
                                            <button type="submit" className='btn px-12 bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                                Sauvegarder
                                            </button>
                                            <button className='btn px-12 bg-[#C0C5CE] rounded-[12px] text-black font-[500] leading-[16px] h-[56px]'>
                                                Annuler
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

export default UpdatePage
