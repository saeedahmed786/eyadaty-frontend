import { Col, Form, Input, Row } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import RightIcon from '../../components/icons/righticon'
import illustration from "../../assets/reset.svg"
import { EyeTwoTone, EyeInvisibleTwoTone } from "@ant-design/icons"
import DownloadApp from '../../components/Home/downloadApp'
import Link from 'next/link'
import MainLayout from '../../components/Layouts/MainLayout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { CustomErrorMessage, CustomSuccessMessage } from '../../components/Messages/messages'

const ResetPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const token = router.query?.token

    const onFinish = async (values) => {
        const { password, confirm } = values;
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-password`, { password, confirm, token }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
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
                            <CustomSuccessMessage messages={`Mot de passe défini avec succès`} handleClose={() => setSuccess(false)} />
                        </div>
                        :
                        error &&
                        <div className='my-5'>
                            <CustomErrorMessage messages="Les deux mots de passe ne sont pas identiques" handleClose={() => setError(false)} />
                        </div>
                }
                <Row className='py-0' align="middle">
                    <Col md={12} className="pr-0 md:pr-24">
                        <div className='flex gap-2 items-center py-3'>
                            <span>Accueil</span> <RightIcon /> <Link className='text-[#0094DA]' href="/reset-password">Réinitialisation du mot de passe</Link>
                        </div>
                        <h1 className='text-[48px] leading-[56px] sm:text-[64px] sm:leading-[72px] font-[700] break-words'>Réinitialisation du mot de passe</h1>
                        <Form
                            form={form}
                            name="Reset"
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="password"
                                label="Mot de passe"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Mot de passe' iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />)} />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
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
                                <Input.Password placeholder='Répéter mot de passe' iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />)} />
                            </Form.Item>
                            <Form.Item className='my-5'>
                                <button type="submit" className='btn w-full bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                    Initialiser
                                </button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col md={12} className="hidden sm:block">
                        <Image src={illustration} className="mt-4 w-full min-w-max h-full" alt="illustration" />
                    </Col>
                </Row>
            </div>
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default ResetPassword
