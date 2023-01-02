import { Checkbox, Col, Divider, Form, Input, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import RightIcon from '../components/icons/righticon'
import illustration from "../assets/signup.svg"
import { EyeTwoTone, EyeInvisibleTwoTone } from "@ant-design/icons"
import DownloadApp from '../components/Home/downloadApp'
import MainLayout from '../components/Layouts/MainLayout'
import { CustomErrorMessage, CustomSuccessMessage } from '../components/Messages/messages'
import { Loading } from '../components/Loading/Loading'
import axios from "axios"
import SocialLogin from '../components/SocialLogin'
import { useTranslation } from 'react-i18next'

const Signup = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const onFinish = async (values) => {
        const { email, password } = values;
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/signup`, { email, password }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setSuccess(true)
            }
            else {
                setError(true)
            }
        })
    };

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto py-8'>
                {
                    success ?
                        <div className='my-5'>
                            <CustomSuccessMessage messages={`Compte créé avec succès!`} handleClose={() => setSuccess(false)} />
                        </div>
                        :
                        error &&
                        <div className='my-5'>
                            <CustomErrorMessage messages="L'adresse e-mail est déjà utilisée" handleClose={() => setError(false)} />
                        </div>
                }
                <div className='flex gap-2 items-center'>
                    <span>{t("Accueil")}</span> <RightIcon /> <Link className='text-[#0094DA]' href="/signup">{t("S'inscrire")}</Link>
                </div>
                <Row className='py-10 block sm:flex' align="middle">
                    <Col md={12}>
                        <h1 className='text-[48px] leading-[56px] sm:text-[64px] sm:leading-[72px] font-[700]'>{t("Créer un compte")}</h1>
                        <div className='flex gap-2 py-6'>
                            <div>{t("Vous n'avez pas de compte ?")}</div>
                            <a href='/login' className='text-[#0094DA]'>{t("Connexion")}</a>
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

                                    <Form.Item
                                        name="confirm"
                                        label={t("Répéter mot de passe")}
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder={t("Répéter mot de passe")} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />)} />
                                    </Form.Item>
                                    <Form.Item
                                        name="agreement"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                            },
                                        ]}
                                    >
                                        <Checkbox>
                                            {t("J'ai lu et j'accepte")} <a className='text-[#0094DA]' href='/policy'>{t("la politique de confidentialité")}</a>
                                        </Checkbox>
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
                    <Col md={12} className="hidden sm:block">
                        <Image src={illustration} className="w-full min-w-max h-full" alt="illustration" />
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default Signup
