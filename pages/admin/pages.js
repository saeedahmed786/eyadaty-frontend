import { Checkbox, Table } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Check from "../../assets/Checkmark.svg"
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons'
import AdminPagination from '../../components/Admin/Pagination'
import RightIcon from '../../components/icons/righticon'
import PlusIcon from '../../components/icons/plusIcon'
import SearchInputs from '../../components/Inputs/SearchInputs'
import { useRouter } from 'next/router'
import SelectBoxWidthSearch from '../../components/Inputs/SelectBox'
import DeleteModal from '../../components/DeleteModal'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import specialitiesArray from "../../assets/specialities.json"
import axios from 'axios'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const Pages = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [pages, setPages] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [categoryId, setCategoryId] = useState("");
    const [status, setStatus] = useState("Pending");
    const [paidStatus, setPaidStatus] = useState("Free");
    const [current, setCurrent] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [clinicName, setClinicName] = useState("");


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
        setCategoryId(specialitiesArray[0].fr)
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
            title: t('Page'),
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
            title: t('Catégorie'),
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
            title: t('Type de page'),
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a?.type?.localeCompare(b?.type),
        },
        {
            title: t('Propriétaire de la page'),
            dataIndex: 'owner',
            key: 'owner',
            sorter: (a, b) => a?.owner?.localeCompare(b?.owner),
        },
        {
            title: t('Actif'),
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
            title: t('Actions'),
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

    const handleSearch = async () => {
        return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/admin/finding?specialisation=${categoryId}&paidStatus=${paidStatus}&status=${status}`).then((response) => {
            setPages(response.data);
        });
    }

    const handleNameOnlySearch = async () => {
        return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics/admin/finding?clinicName=${clinicName}`).then((response) => {
            setPages(response.data);
        });
    }


    const handleFilter = () => {
        handleSearch();
    }

    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='md:flex justify-between items-start flex-wrap'>
                    <div>
                        <div className='flex gap-2 justify-start items-center pb-4'>
                            <span>{t("Accueil")}</span> <RightIcon /> <button className='text-[#0094DA]'>{t("Les pages")}</button>
                        </div>
                        <div>
                            <h1 className='bigTitle'>{t("Les pages")}</h1>
                            <div className='md:max-w-[40vw]'>
                                <div className='flex gap-3 mt-12'>
                                    <div className='w-[100%]'>
                                        <SearchInputs handleUpdate={(val) => setClinicName(val)} />
                                    </div>
                                    <button onClick={handleNameOnlySearch} className='flex items-center md:w-full justify-center gap-2 bg-[#fff] border border-[#0094DA] rounded-[12px] text-[#0094DA] h-[48px] px-6'>
                                        <FilterOutlined />
                                        <span className='text-[16px] font-[500]'>{t("Filter")}</span>
                                    </button>
                                </div>
                                <div className='mt-12'>
                                    <SelectBoxWidthSearch data={specialitiesArray} prevValue={specialitiesArray[0].fr} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                                </div>
                                <div className='flex justify-between flex-wrap gap-6 mt-6'>
                                    <div>
                                        <h5>{t("Type de page")}</h5>
                                        <div className='flex justify-between gap-6 sm:gap-0 mt-3'>
                                            <Checkbox value="Free" checked={paidStatus === "Free"} onChange={(e) => setPaidStatus(e.target.value)}>{t("Freemium")}</Checkbox>
                                            <Checkbox value="Premium" checked={paidStatus === "Premium"} onChange={(e) => setPaidStatus(e.target.value)}>{t("Premium")}</Checkbox>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>{t("Actif")}</h5>
                                        <div className='flex justify-between gap-6 sm:gap-0 w-full mt-3'>
                                            <Checkbox value="Active" checked={status === "Active"} onChange={(e) => setStatus(e.target.value)}>{t("Activé")}</Checkbox>
                                            <Checkbox value="Pending" checked={status === "Pending"} onChange={(e) => setStatus(e.target.value)}>{t("En attente")}</Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleFilter} className='bg-[#0094DA] mt-6 rounded-[12px] text-white h-[48px] w-full md:w-[auto] px-12 text-[16px] font-[500]'>
                                Filtrez
                            </button>
                        </div>
                    </div>
                    <div className='mt-8 sm:mt-0'>
                        <button onClick={() => router.push("/admin/create-page")} className='flex items-center justify-center gap-2 bg-[#0094DA] w-full rounded-[12px] text-white h-[48px] px-6'>
                            <PlusIcon />
                            <span className='text-[16px] font-[500]'>{t("Ajouter un page")}</span>
                        </button>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='hidden md:block bg-white'>
                        <Table showSorterTooltip columns={columns} pagination={false} dataSource={pages} />
                    </div>
                    <div className='block md:hidden'>
                        {
                            pages && pages.length > 0 && pages.map(page => {
                                return (
                                    <div className='flex justify-between p-3 bg-white mt-1 rounded-[16px]'>
                                        <div>
                                            <div className='text-[#0094DA] text-[12px] font-[500]'>{page._id}</div>
                                            <div className='min-w-[130px] mt-3'>
                                                <div className='nameAndPic w-full flex justify-between'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='profileImg'>
                                                            <img src={page?.picture?.url} alt="Doctor" width={32} height={32} className="rounded-[50%]" />
                                                        </div>
                                                        <div className='w-full'>
                                                            <div className='flex gap-2'>
                                                                <h6>{page?.firstName} {page?.lastName}</h6>
                                                                <Image src={Check} alt="Checkmark" className='w-[32px] h-[32px]' />
                                                            </div>
                                                            <p className='mt-0 text-left text-[#65737E] text-[12px]'>{page?.specialisation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-5'>{page?.specialisation}</div>
                                            <div className='mt-5'>{page?.paidStatus}</div>
                                            <div className='mt-5'>{page?.owner}</div>
                                        </div>
                                        <div className='flex justify-end text-end'>
                                            <div>
                                                <div className={`tag ${page?.status} rounded-[12px] text-[12px] font-[500] mb-4`}>{page?.status}</div>
                                                <div className='flex items-center gap-4 mt-3'>
                                                    <Link href={"/doctor/" + page?._id}><EyeOutlined /></Link>
                                                    <EditOutlined onClick={() => router.push(`/admin/update-page/${page?._id}`)} />
                                                    <DeleteModal deleteFun={deleteHandler} id={page._id} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='adminPagination bg-white p-4 flex items-center justify-between flex-wrap rounded-[16px] md:rounded-none my-1 md:my-12'>
                        <p className='text-[#65737E] text-[12px]'>{t("Affichage de")} {current * 10} sur {totalPages}  entrées</p>
                        <AdminPagination totalLength={totalPages} handlePagination={(curr) => { setCurrent(curr); getAllPages(curr) }} />
                    </div>
                </div>
            </div >
        </AdminLayout >
    )
}

export default Pages
