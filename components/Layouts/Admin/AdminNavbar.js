import { BellOutlined } from '@ant-design/icons'
import { Badge, Dropdown } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../../../components/Messages/messages'
import { isAuthenticated } from '../../Auth/auth'
import SearchInputs from '../../Inputs/SearchInputs'
import doctor from '/assets/doc.jpg'


const AdminNavbar = () => {
    const router = useRouter();
    const [userAuth, setUserAuth] = useState();
    const [notifications, setNotifications] = useState([]);
    const { t } = useTranslation();


    const getAllNotifications = async (auth) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/notifications`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setNotifications(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const markRead = async (auth) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/mark-read`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                // SuccessMessage(res.data.successMessage);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllNotifications(isAuthenticated());
        return () => {
        }
    }, []);


    const menu = (
        <div className='notificationPanel p-4 bg-white w-[200px] shadow-lg min-w-[220px]'>
            {
                notifications && notifications?.length > 0 ? notifications?.map(not => {
                    return (
                        <button onClick={() => router.push(not?.link)} className='flex gap-2 items-center mb-4'>
                            {
                                not?.user ?
                                    <img src={not?.user?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                                    :
                                    <Image src={doctor} alt="Doc" width={36} height={36} className="rounded-[50%]" />
                            }
                            <div>{not?.text}</div>
                        </button>
                    )
                })
                    :
                    <div className='text-center'>No Notifications!</div>
            }
        </div>
    )


    return (
        <div className='AdminNavbar bg-[white] p-2 rounded-[16px]'>
            <div className='flex justify-between items-center'>
                <div className='w-[50%]'>
                    <SearchInputs placeholder={`${t("Chercher")}...`} />
                </div>
                <div className='flex gap-10 items-center'>
                    <Dropdown
                        trigger={['click']}
                        overlay={menu}>
                        <Badge color='#0094DA' count={notifications && notifications?.length > 0 && notifications?.filter(n => n.readStatus === "false")?.length}>
                            <BellOutlined onClick={() => markRead(isAuthenticated())} style={{ fontSize: "21px" }} />
                        </Badge>
                    </Dropdown>
                    <div className='flex items-center gap-2'>
                        <div className='text-end'>
                            <h4 className='font-[500] text-[#333B42]'>{userAuth?.fullName}</h4>
                            <p className='text-[12px] text-[#65737E]'>Admin</p>
                        </div>
                        <div>
                            <Badge offset={[-6, 32]} dot color='#29C773' count={5}>
                                {
                                    userAuth?.picture ?
                                        <img src={userAuth?.picture?.url} width={43} className="rounded-[50%] object-cover h-[43px]" alt="Profile" />
                                        :
                                        <Image src={doctor} alt="Doc" width={36} height={36} className="rounded-[50%]" />
                                }
                                {/* <Image objectFit='cover' src={doctor} width={36} height={36} className="rounded-[50%]" alt="doctor" /> */}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
