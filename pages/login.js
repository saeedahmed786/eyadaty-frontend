import { Col, Divider, Form, Input, Row, Switch } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RightIcon from '../components/icons/righticon'
import illustration from "../assets/Illustration.svg"
import { EyeTwoTone, EyeInvisibleTwoTone } from "@ant-design/icons"
import DownloadApp from '../components/Home/downloadApp'
import { useRouter } from 'next/router'
import MainLayout from '../components/Layouts/MainLayout'
import { CustomErrorMessage, CustomSuccessMessage } from '../components/Messages/messages'
import { Loading } from '../components/Loading/Loading'
import axios from "axios"
import { Cookies } from 'react-cookie'
import SocialLogin from '../components/SocialLogin'
import { isAuthenticated } from '../components/Auth/auth'
import { useTranslation } from 'react-i18next'


const Login = () => {
    const cookies = new Cookies;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [remember, setRemember] = useState(false);
    const router = useRouter();

    const onFinish = async (values) => {
        const { email, password } = values;
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, { email, password }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                setSuccess(true);
                cookies.set('user', res.data.user, { path: '/' });
                cookies.set('token', res.data.token, { path: '/' });
                if (remember) {
                    saveCredentials(form.getFieldValue("email"), form.getFieldValue("password"));
                    setTimeout(() => {
                        router.push('/');
                    }, 5000);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    setTimeout(() => {
                        router.push('/');
                    }, 5000);
                }
            }
            else {
                setError(true);
            }
        })
    };



    const saveCredentials = (email, password) => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    }

    useEffect(() => {
        form.setFieldsValue({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), })

        return () => {

        }
    }, [])

    useEffect(() => {
        const interval = success || error && setInterval(() => {
            setSuccess(false);
            setError(false);
        }, 10000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [success, error])



    return (
        <MainLayout navbar>
            <div className='lg:container px-5 mx-auto py-8'>
                {
                    success ?
                        <div className='my-5'>
                            <CustomSuccessMessage messages={`Bienvenue ${isAuthenticated().fullName} !`} handleClose={() => setSuccess(false)} />
                        </div>
                        :
                        error &&
                        <div className='my-5'>
                            <CustomErrorMessage messages="E-mail ou mot de passe incorrect" handleClose={() => setError(false)} />
                        </div>
                }
                <div className='flex gap-2 items-center'>
                    <span>{t("Accueil")}</span> <RightIcon />  <button className='text-[#0094DA] border-0' onClick={() => router.push("/signup")}>{t("Connexion")}</button>
                </div>
                <Row className='py-10' align={"middle"}>
                    <Col lg={12}>
                        <h1 className='text-[48px] leading-[56px] sm:text-[64px] sm:leading-[72px] font-[700]'>{t("Connectez-vous ?? votre compte")}</h1>
                        <div className='flex gap-2 py-6'>
                            <div>{t("Vous n'avez pas de compte???")}</div>
                            <button className='text-[#0094DA] border-0' onClick={() => router.push("/signup")}>{t("Cr??er un compte")}</button>
                        </div>
                        {
                            loading ?
                                <Loading />
                                :
                                <Form
                                    form={form}
                                    name="Login"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="email"
                                        label={t("E-mail")}
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
                                        <Input placeholder={t("E-mail")} />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label={t("Mot de passe")}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder={t("Mot de passe")} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />)} />
                                    </Form.Item>
                                    <Form.Item className='my-5'>
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <Switch onClick={(checked) => setRemember(checked)} className='bg-gray border border-[#A7ADBA] rounded-[12px]' />
                                                <span className='text-[14px] font-[500]'>{t("souviens-toi de moi")}</span>
                                            </div>
                                            <div>
                                                <button type='button' className='text-[#0094DA] text-[14px] font-[500] border-0 text-end' onClick={() => router.push("/forgot-password")}>{t("j'ai oublie le mot de passe?")}</button>
                                            </div>
                                        </div>
                                    </Form.Item>
                                    <Form.Item className='my-5'>
                                        <button type="submit" className='btn w-full bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                            {t("Connexion")}
                                        </button>
                                    </Form.Item>
                                </Form>
                        }
                        <Divider className='my-4' plain>{t("Ou")}</Divider>
                        <div className='flex justify-center gap-4'>
                            <SocialLogin />
                        </div>
                    </Col>
                    <Col lg={12} className="hidden lg:block">
                        <Image src={illustration} alt="illustration" />
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default Login
