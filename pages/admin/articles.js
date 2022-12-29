import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import AdminPagination from '../../components/Admin/Pagination'
import RightIcon from '../../icons/righticon'
import PlusIcon from '../../icons/plusIcon'
import { useRouter } from 'next/router'
import DeleteModal from '../../components/DeleteModal'
import axios from 'axios'
import { ErrorMessage, SuccessMessage } from '../../Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import moment from 'moment'
import Link from 'next/link'

const Articles = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [userAuth, setUserAuth] = useState({});
    const [current, setCurrent] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState();

    const getAllBlogs = async (curr) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/limited/${curr - 1}`).then(res => {
            if (res.statusText === "OK") {
                setBlogs(res.data.blogs);
                setTotalBlogs(res.data.count);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllBlogs(current);
        return () => {
        }
    }, []);


    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + userAuth?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage)
                getAllBlogs();
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
            sorter: (a, b) => a?._id > b?._id,
            render: (_, { _id }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
                </>
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
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a?.title?.localeCompare(b?.title),
            render: (_, { title }) => (
                <p className='textElipsisTwoLines'>
                    {title}
                </p>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt.length - b.createdAt.length,
            render: (_, { createdAt }) => (
                <p className='textElipsisTwoLines'>
                    {moment(createdAt).format("DD/MM/YYYY")}
                </p>
            ),
        },
        {
            title: 'Auteur',
            dataIndex: 'author',
            key: 'author',
            sorter: (a, b) => a?.user?.fullName?.localeCompare(b?.user?.fullName),
            render: (_, { user }) => (
                <p className='textElipsisTwoLines'>
                    {user?.fullName}
                </p>
            ),
        },
        {
            title: 'Actions',
            render: (_, blog) => (
                <>
                    <div className='flex items-center gap-4'>
                        <Link href={"/blog/" + blog._id}><EyeOutlined /></Link>
                        <EditOutlined onClick={() => router.push(`/admin/update-article/${blog._id}`)} />
                        <DeleteModal id={blog?._id} deleteFun={deleteHandler} deleteBtn={<DeleteOutlined style={{ verticalAlign: "middle" }} />} />
                    </div>
                </>
            ),
        },
    ];


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Articles</button>
                    </div>
                    <div>
                        <button onClick={() => router.push("/admin/create-article")} className='flex items-center gap-2 bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6'>
                            <PlusIcon />
                            <span className='text-[16px] font-[500]'>Ajouter un article</span>
                        </button>
                    </div>
                </div>
                <h1 className='bigTitle'>Articles</h1>
                <div className='mt-10 bg-white'>
                    <Table showSorterTooltip columns={columns} pagination={false} dataSource={blogs} />
                    <div className='adminPagination p-4 flex items-center justify-between my-12'>
                        <p className='text-[#65737E] text-[12px]'>Affichage de {current * 10} sur {totalBlogs}  entrées</p>
                        <AdminPagination totalLength={totalBlogs} handlePagination={(curr) => { setCurrent(curr); getAllBlogs(curr) }} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Articles
