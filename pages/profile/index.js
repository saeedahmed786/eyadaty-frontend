import React, { useEffect, useState } from 'react'
import ProfileLayout from '../../components/Layouts/ProfileLayout'
import { ArrowUpOutlined } from '@ant-design/icons';
import { DatePicker, Input, Form, Radio, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { isAuthenticated } from '../../components/Auth/auth';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages';
import { Cookies } from 'react-cookie';
import { Loading } from '../../components/Loading/Loading';
import statesArray from "../../assets/town_city/wilaya.json"
import citiesArray from "../../assets/town_city/communes.json"
import profileIcon from "../../assets/profile.svg"
import { useForm } from 'antd/lib/form/Form';
import Image from 'next/image';


const { Option } = Select;

const Profile = () => {
    const cookies = new Cookies;
    const [gender, setGender] = useState("Male");
    const [getFormData] = useForm();
    const [loading, setLoading] = useState(true);
    const [profileFile, setProfileFile] = useState({});
    const [userAuth, setUserAuth] = useState({});
    // State to store selected state and city
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Handle state selection
    const handleStateSelection = (value) => {
        setSelectedState(value);
        setSelectedCity('');
    }

    const onFinish = async (values) => {
        const { email, name, phone, dob, city, gender } = values;
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-profile`, {
            name, email, phone, city, state: selectedState, gender, dob, profileFile
        }, {
            headers: {
                "authorization": "Bearer " + userAuth?.token
            }
        }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                cookies.set('user', res.data.user, { path: '/' });
                document.location.reload();
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const disabledDate = current => {
        // Disables all dates that are later than today
        return current && current > moment().endOf('day');
    };

    const getUserById = async (auth) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get/${auth._id}`, {
            headers: {
                "authorization": "Bearer " + auth.token
            }
        }).then(res => {
            if (res.statusText === "OK" && res.data?.email) {
                getFormData.setFieldsValue({
                    email: res.data?.email,
                    name: res.data?.fullName,
                    phone: res.data?.phone,
                    city: res.data?.city,
                    gender: res.data?.gender,
                    state: res.data?.state,
                    dob: moment(res.data?.dob),
                    city: res.data?.city,
                });
                setProfileFile(res.data?.picture);
                setSelectedState(res.data?.state);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
            setLoading(false);
        }).catch(err => {
            // console.log(err)
            setLoading(false);
        })
    };

    useEffect(() => {
        setTimeout(() => {
            setUserAuth(isAuthenticated());
            getUserById(isAuthenticated());
        }, 1000);

        return () => {

        }
    }, [])

    const handleProfileFileUpload = (f) => {
        uploadFilesFun(f, userAuth?.token).then(res => {
            setProfileFile(res)
        })
    }

    return (
        <ProfileLayout sidebar>
            {
                loading ?
                    <Loading />
                    :
                    <div className='Profile px-10'>
                        <div className='mt-0'>
                            <div className='pictureUploadContainer'>Image de profile</div>
                            <div className='flex gap-4 items-center mt-4'>
                                {
                                    profileFile && profileFile?.url ?
                                        <img src={profileFile?.url} objectFit="cover" width={80} className="rounded-[50%] h-[80px]" alt="Profile" />
                                        :
                                        <Image src={profileIcon} objectFit="cover" width={80} height={80} className="rounded-[50%]" alt="Profile" />
                                }
                                <div className='relative'>
                                    <span className="btn btn-primary btn-file">
                                        <button className='uploadBtn flex items-center gap-2'>
                                            <span>Ajouter un image</span>
                                            <span className='arrowUp'><ArrowUpOutlined /></span>
                                            <input onChange={(e) => handleProfileFileUpload(e.target.files[0])} accept="image/*" name='file' type="file" />
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
                            <Form
                                form={getFormData}
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                                className='mt-10'
                            >
                                <Form.Item
                                    name="name"
                                    label="Nom & Prénom"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Nom & Prénom!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nom & Prénom' />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="E-mail"
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
                                <Form.Item name="gender" label="Gender">
                                    <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="dob" label="Date de naissance" hasFeedback>
                                    <DatePicker
                                        disabledDate={disabledDate}
                                        placeholder='JJ/MM/AAAA'
                                        onChange={(value) => setDob(value)}
                                        suffixIcon={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Phone!',
                                        }
                                    ]}
                                >
                                    <Input placeholder='Phone' prefix={"+213"} />
                                </Form.Item>
                                <Form.Item
                                    name="state"
                                    label="Wilaya"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select wilaya!',
                                        },
                                    ]}
                                >
                                    <Select onChange={handleStateSelection} placeholder="Wilaya">
                                        {statesArray && statesArray?.length > 0 && statesArray?.map((state) => (
                                            <Option key={state.nom.fr} value={state.nom.fr}>{state.nom.fr}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="city"
                                    label="Commune"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select Commune!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Commune">
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
                                <Form.Item className='my-5'>
                                    <div className='flex gap-4'>
                                        <button type="submit" className='btn px-12 bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                            Sauvegarder
                                        </button>
                                        <button type='button' className='btn px-12 bg-[#C0C5CE] rounded-[12px] text-black font-[500] leading-[16px] h-[56px]'>
                                            Annuler
                                        </button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
            }
        </ProfileLayout>
    )
}

export default Profile
