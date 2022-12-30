import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import AdminPagination from '../../components/Admin/Pagination'
import RightIcon from '../../components/icons/righticon'
import DeleteModal from '../../components/DeleteModal'
import axios from 'axios'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import { isAuthenticated } from '../../components/Auth/auth'
import moment from 'moment'

const Users = () => {
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
        },
        {
            title: 'Nom & Prénom',
            render: (d) => (
                <>
                    <div>
                        <h4 className='text-[#1C2126] font-[500]'>{d.fullName}</h4>
                        <p className='text-[#65737E] font-[400]'>{d.email}</p>
                    </div>
                </>
            ),
            sorter: (a, b) => a?.fullName?.localeCompare(b?.fullName),
        },
        {
            title: 'Date de naissance',
            dataIndex: 'dob',
            key: 'dob',
            render: (_, { dob }) => (
                <>
                    <div className='text-[#0094DA] text-[12px] font-[500]'>{moment(dob).format('DD/MM/YYYY')}</div>
                </>
            ),
            sorter: (a, b) => a.dob.length - b.dob.length
        },
        {
            title: 'Wilaya',
            dataIndex: 'state',
            key: 'state',
            sorter: (a, b) => a?.state?.localeCompare(b?.state),
        },
        {
            title: 'Commune',
            dataIndex: 'city',
            key: 'city',
            sorter: (a, b) => a?.city?.localeCompare(b?.city),
        },
        {
            title: 'Gendre',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a?.gender?.localeCompare(b?.gender),
        },
        {
            title: 'Actions',
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
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Utilisateurs</button>
                    </div>
                </div>
                <h1 className='bigTitle'>Utilisateurs</h1>
                <div className='mt-10 bg-white'>
                    <Table showSorterTooltip columns={columns} pagination={false} dataSource={users} />
                    <div className='adminPagination p-4 flex items-center justify-between my-12'>
                        <p className='text-[#65737E] text-[12px]'>Affichage de {current * 10} sur {totalUsers} entrées</p>
                        <AdminPagination totalLength={totalUsers} handlePagination={(curr) => { setCurrent(curr); getAllUsers(userAuth, curr) }} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users
