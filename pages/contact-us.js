import { Col, Form, Input, Row } from 'antd'
import Image from 'next/image'
import linkedin from "../assets/smallLinkedin.svg"
import instagram from "../assets/smallInstagram.svg"
import facebook from "../assets/smallFacebook.svg"
import twitter from "../assets/smallTwitter.svg"
import React, { useState } from 'react'
import RightIcon from '../components/icons/righticon'
import illustration from "../assets/contact.svg"
import DownloadApp from '../components/Home/downloadApp'
import Link from 'next/link'
import MainLayout from '../components/Layouts/MainLayout'
import axios from 'axios'
import { SuccessMessage } from '../components/Messages/messages'
import { Loading } from '../components/Loading/Loading'

const { TextArea } = Input;

const ContactUs = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const onFinish = async (values) => {
        const { fullName, email, message } = values;
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/contactUs`, { fullName, email, message }).then(res => {
            setLoading(false);
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage);
            }
            else {
                setError(true);
            }
        })
    };

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto py-8'>
                <Row align="middle">
                    <Col md={12} className="pr-0 md:pr-24">
                        <div className='flex gap-2 items-center py-4'>
                            <span>Accueil</span> <RightIcon /> <Link className='text-[#0094DA]' href="/contact-us">Contactez-nous</Link>
                        </div>
                        <h1 className='text-[64px] leading-[72px] font-[700] pb-6'>Contactez-nous</h1>
                        {
                            loading ?
                                <Loading />
                                :
                                <Form
                                    form={form}
                                    name="ContactUs"
                                    onFinish={onFinish}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="fullName"
                                        label="Nom et prénom"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Nom et prénom',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Nom et prénom' />
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
                                    <Form.Item
                                        name="message"
                                        label="Méssage"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Méssage',
                                            },
                                        ]}
                                    >
                                        <TextArea rows={6} placeholder='Méssage' />
                                    </Form.Item>
                                    <Form.Item className='my-5'>
                                        <button type="submit" className='btn w-full bg-[#0094DA] rounded-[12px] text-white h-[56px]'>
                                            Envoyez
                                        </button>
                                    </Form.Item>
                                </Form>
                        }
                        <div className='text-center pt-8'>
                            <p className='pb-2'>Suivez-nous sur</p>
                            <div className='flex justify-center gap-1'>
                                <Link href="www.facebook.com">
                                    <Image src={facebook} alt="facebook" width="40px" />
                                </Link>
                                <Link href="www.twitter.com">
                                    <Image src={twitter} alt="twitter" width="40px" />
                                </Link>
                                <Link href="www.instagram.com">
                                    <Image src={instagram} alt="instagram" width="40px" />
                                </Link>
                                <Link href="www.linkedin.com">
                                    <Image src={linkedin} alt="linkedin" width="40px" />
                                </Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className="hidden md:block">
                        <Image src={illustration} alt="illustration" />
                    </Col>
                </Row >
            </div >
            <DownloadApp noMargin={true} />
        </MainLayout>
    )
}

export default ContactUs
