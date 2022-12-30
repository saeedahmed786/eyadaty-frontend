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
import axios from 'axios'
import Link from 'next/link'

const Pages = () => {
    const router = useRouter();
    const [pages, setPages] = useState([]);
    const [originalPages, setOriginalPages] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [status, setStatus] = useState("Pending");
    const [paidStatus, setPaidStatus] = useState("Free");
    const [current, setCurrent] = useState(1);
    const [totalPages, setTotalPages] = useState();


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
            sorter: (a, b) => a?.category?.localeCompare(b?.category),
            render: (_, { category }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{category}</div>
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


    const handleFilter = () => {
        // setPages(...pages, pages.filter(p => p?.category?._id === categoryId || p?.status?.includes() === status || p?.paidStatus === paidStatus))
        const filteredItems = originalPages.slice().filter(page => {
            return (
                page?.status.includes(status) &&
                page?.paidStatus.includes(paidStatus) &&
                page?.category?._id === categoryId
            );
        });
        setPages(filteredItems);
    }

    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Les pages</button>
                    </div>
                    <div>
                        <button onClick={() => router.push("/admin/create-page")} className='flex items-center gap-2 bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6'>
                            <PlusIcon />
                            <span className='text-[16px] font-[500]'>Ajouter un page</span>
                        </button>
                    </div>
                </div>
                <h1 className='bigTitle'>Les pages</h1>
                <div className='max-w-[40vw]'>
                    <div className='flex gap-3 mt-12'>
                        <SearchInputs />
                        <button className='flex w-full items-center justify-center gap-2 bg-[#fff] border border-[#0094DA] rounded-[12px] text-[#0094DA] h-[48px] px-6'>
                            <FilterOutlined />
                            <span className='text-[16px] font-[500]'>Filter</span>
                        </button>
                    </div>
                    <div className='mt-12'>
                        <SelectBoxWidthSearch data={categories} prevValue={categories[0]?._id} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                    </div>
                    <div className='flex justify-between mt-6'>
                        <div>
                            <h5>Type de page</h5>
                            <div className='flex justify-between mt-3'>
                                <Checkbox value="Free" checked={paidStatus === "Free"} onChange={(e) => setPaidStatus(e.target.value)}>Freemium</Checkbox>
                                <Checkbox value="Premium" checked={paidStatus === "Premium"} onChange={(e) => setPaidStatus(e.target.value)}>Premium</Checkbox>
                            </div>
                        </div>
                        <div>
                            <h5>Actif</h5>
                            <div className='flex justify-between mt-3'>
                                <Checkbox value="Active" checked={status === "Active"} onChange={(e) => setStatus(e.target.value)}>Activé</Checkbox>
                                <Checkbox value="Pending" checked={status === "Pending"} onChange={(e) => setStatus(e.target.value)}>En attente</Checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleFilter} className='bg-[#0094DA] mt-6 rounded-[12px] text-white h-[48px] px-12 text-[16px] font-[500]'>
                    Filtrez
                </button>
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

export default Pages
