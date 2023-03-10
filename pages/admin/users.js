import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import AdminPagination from '../../components/Admin/Pagination'
import RightIcon from '../../components/icons/righticon'
import DeleteModal from '../../components/DeleteModal'
import axios from 'axios'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const Users = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [current, setCurrent] = useState(1);
    const [totalUsers, setTotalUsers] = useState();

    const getAllUsers = async (auth, curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/limited/${curr - 1}`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setUsers(res.data.users);
                setTotalUsers(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllUsers(isAuthenticated(), current);
        return () => {
        }
    }, []);


    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + userAuth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage)
                getAllUsers();
            } else {
                ErrorMessage(res.data.errorMessage)
            }
        })

    }

    const columns = [
        {
            title: '#',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id.length - b._id.length,
            render: (_, { _id }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
                </>
            ),
            responsive: ['md'],
        },
        {
            title: t('Nom & Pr??nom'),
            render: (d) => (
                <>
                    <div>
                        <h4 className='text-[#1C2126] font-[500]'>{d.fullName}</h4>
                        <p className='text-[#65737E] font-[400]'>{d.email}</p>
                    </div>
                </>
            ),
            sorter: (a, b) => a?.fullName?.localeCompare(b?.fullName),
            responsive: ['md'],
        },
        {
            title: t('Date de naissance'),
            dataIndex: 'dob',
            key: 'dob',
            render: (_, { dob }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{moment(dob).format('DD/MM/YYYY')}</div>
                </>
            ),
            sorter: (a, b) => a.dob.length - b.dob.length,
            responsive: ['md'],
        },
        {
            title: t('Wilaya'),
            dataIndex: 'state',
            key: 'state',
            sorter: (a, b) => a?.state?.localeCompare(b?.state),
        },
        {
            title: t('Commune'),
            dataIndex: 'city',
            key: 'city',
            sorter: (a, b) => a?.city?.localeCompare(b?.city),
        },
        {
            title: t('Gendre'),
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a?.gender?.localeCompare(b?.gender),
        },
        {
            title: t('Actions'),
            render: (_, user) => (
                <>
                    <div className='flex items-center gap-4'>
                        <EyeOutlined />
                        {/* <EditOutlined onClick={() => router.push("/admin/update-article")} /> */}
                        <DeleteModal id={user._id} deleteFun={deleteHandler} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                    </div>
                </>
            ),
        },
    ];

    return (
        <AdminLayout sidebar>
            <div className='Users pt-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("Utilisateurs")}</button>
                    </div>
                </div>
                <h1 className='bigTitle'>{t("Utilisateurs")}</h1>
                <div className='mt-10'>
                    <div className='hidden md:block bg-white'>
                        <Table showSorterTooltip columns={columns} pagination={false} dataSource={users} />
                    </div>
                    <div className='block md:hidden'>
                        {
                            users && users.length > 0 && users.map(user => {
                                return (
                                    <div className='my-1'>
                                        <div className='flex justify-between items-start p-3 bg-white mt-1 rounded-[16px]'>
                                            <div>
                                                <div className='text-[#0094DA] text-[12px] font-[500]'>#{user._id}</div>
                                                <h2 className='textElipsisTwoLines font-[500] mt-5'>
                                                    {user?.fullName}
                                                </h2>
                                                <p className='mt-5 text-[12px]'>
                                                    {moment(user?.dob).format("DD/MM/YYYY")}
                                                </p>
                                                <div className='mt-5 text-[12px]'>{user?.city}</div>
                                                <div className='mt-5 text-[12px]'>{user?.state}</div>
                                            </div>
                                            <div className='flex justify-end text-end'>
                                                <div className='flex items-center gap-4'>
                                                    <Link href={"/page/" + user._id}><EyeOutlined /></Link>
                                                    <EditOutlined onClick={() => router.push(`/admin/update-article/${user._id}`)} />
                                                    <DeleteModal id={user?._id} deleteFun={deleteHandler} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='adminPagination p-4 flex items-center justify-between my-12'>
                        <p className='text-[#65737E] text-[12px]'>{t("Affichage de")} {current * 10} sur {totalUsers} entr??es</p>
                        <AdminPagination totalLength={totalUsers} handlePagination={(curr) => { setCurrent(curr); getAllUsers(userAuth, curr) }} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users
