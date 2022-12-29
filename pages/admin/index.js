import { Col, Row, Table } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import aboutimg from '/assets/aboutusimage.svg'
import Check from "../../assets/Checkmark.svg"
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import UserIcon from '../../icons/userIcon'
import DocumentIcon from '../../icons/documentIcon'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import AdminPagination from '../../components/Admin/Pagination'
import DeleteModal from '../../components/DeleteModal'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ErrorMessage, SuccessMessage } from '../../Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import Link from 'next/link'
import formatStringNumbers from '../../components/FormatNumbers'

const Admin = () => {
    const router = useRouter();
    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [userAuth, setUserAuth] = useState({});
    const [current, setCurrent] = useState(1);
    const [totalUsers, setTotalUsers] = useState();

    const getAllUsers = async (auth) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/limited/0`, {
            headers: {
                "authorization": "Bearer " + auth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                setTotalUsers(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }


    const getAllPages = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/limited/${curr - 1}`).then(res => {
            if (res.statusText === "OK") {
                setPages(res.data.clinics);
                setTotalPages(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllPages(current);
        getAllUsers(isAuthenticated());
        return () => {
        }
    }, []);


    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + userAuth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage)
                getAllPages();
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
            sorter: (a, b) => a?._id?.length - b?._id?.length,
            render: (_, { _id }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
                </>
            ),
        },
        {
            title: 'Page',
            dataIndex: 'user',
            key: 'user',
            sorter: (a, b) => a?.firstName?.localeCompare(b?.firstName),
            render: (_, user) => (
                <div className='min-w-[130px]'>
                    <div className='nameAndPic w-full flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <div className='profileImg'>
                                <img src={user?.picture?.url} alt="Doctor" width={32} height={32} className="rounded-[50%]" />
                            </div>
                            <div className='w-full'>
                                <div className='flex gap-2'>
                                    <h6>{user?.firstName} {user?.lastName}</h6>
                                    <Image src={Check} alt="Checkmark" className='w-[32px] h-[32px]' />
                                </div>
                                <p className='mt-0 text-left text-[#65737E] text-[12px]'>{user?.category?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Catégorie',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a?.specialisation?.localeCompare(b?.specialisation),
            render: (_, { specialisation }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{specialisation}</div>
                </>
            ),
        },
        {
            title: 'Type de page',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a?.type?.localeCompare(b?.type),
        },
        {
            title: 'Propriétaire de la page',
            dataIndex: 'owner',
            key: 'owner',
            sorter: (a, b) => a?.owner?.localeCompare(b?.owner),
        },
        {
            title: 'Actif',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a?.status?.localeCompare(b?.status),
            render: (_, { status }) => (
                <>
                    <div className={`tag ${status} rounded-[12px] text-[12px] font-[500]`}>{status}</div>
                </>
            ),
        },
        {
            title: 'Actions',
            render: (_, page) => (
                <>
                    <div className='flex items-center gap-4'>
                        <Link href={"/doctor/" + page._id}><EyeOutlined /></Link>
                        <EditOutlined onClick={() => router.push(`/admin/update-page/${page._id}`)} />
                        <DeleteModal deleteFun={deleteHandler} id={page._id} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                    </div>
                </>
            ),
        },
    ];

    return (
        <AdminLayout sidebar>
            <div className='Admin pt-6'>
                <Row gutter={[0, 0]}>
                    <Col md={14} className="pr-6">
                        <div className="bg-white p-6 py-10 shadow-[0px 2px 4px rgba(0, 0, 0, 0.08)] rounded-[16px]">
                            <div className='flex items-center justify-between gap-6'>
                                <div>
                                    <Image src={aboutimg} alt="Doc" height={193} width={174} />
                                </div>
                                <div className='w-full'>
                                    <p className="text-sm  text-sitegreen mb-0 w-full">Témoignages</p>
                                    <h1 className="text-[32px] sm:text-[56px] mb-0 font-extrabold leading-[64px] text-gray-900">Achref maher.</h1>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={12} className="pr-6">
                                <div className="bg-white p-6 py-10 pt-6 shadow-[0px 2px 4px rgba(0, 0, 0, 0.08)] rounded-[16px]">
                                    <div className=''>
                                        <div className='bg-[#C9E681] w-[48px] h-[48px] rounded-[50%] flex justify-center items-center'>
                                            <UserIcon />
                                        </div>
                                        <div className='w-full'>
                                            <h1 className="text-[32px] sm:text-[56px] mb-0 font-extrabold leading-[64px] text-gray-900">{formatStringNumbers(totalUsers)}</h1>
                                            <p className="text-sm text-[#65737E] mb-0 w-full">Utilisateurs</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} className="pr-6">
                                <div className="bg-white p-6 py-10 pt-6 shadow-[0px 2px 4px rgba(0, 0, 0, 0.08)] rounded-[16px]">
                                    <div className=''>
                                        <div className='bg-[#4DC5FF] w-[48px] h-[48px] rounded-[50%] flex justify-center items-center'>
                                            <DocumentIcon />
                                        </div>
                                        <div className='w-full'>
                                            <h1 className="text-[32px] sm:text-[56px] mb-0 font-extrabold leading-[64px] text-gray-900">{formatStringNumbers(totalPages)}</h1>
                                            <p className="text-sm text-[#65737E] mb-0 w-full">Les pages</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className='mt-10 bg-white'>
                    <Table showSorterTooltip columns={columns} pagination={false} dataSource={pages} />
                    <div className='adminPagination p-4 flex items-center justify-between my-12'>
                        <p className='text-[#65737E] text-[12px]'>Affichage de {current * 10} sur {totalPages}  entrées</p>
                        <AdminPagination totalLength={totalPages} handlePagination={(curr) => { setCurrent(curr); getAllPages(curr) }} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Admin
