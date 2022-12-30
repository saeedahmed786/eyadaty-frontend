import { DeleteOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CreateMainCategories } from '../../../components/Admin/Categories/CreateMainCategories';
import { UpdateCategories } from '../../../components/Admin/Categories/UpdateCategories';
import { isAuthenticated } from '../../../components/Auth/auth';
import AdminLayout from '../../../components/Layouts/Admin/AdminLayout';
import { ErrorMessage, SuccessMessage } from '../../../components/Messages/messages';

const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [userAuth, setUserAuth] = useState({});

  const getAllCategories = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
      if (res.statusText === "OK") {
        setCategories(res.data);
      } else {
        ErrorMessage(res.data.errorMessage);
      }
    })
  }

  useEffect(() => {
    setUserAuth(isAuthenticated());
    getAllCategories();
    return () => {
    }
  }, []);

  const updateFunction = () => {
    getAllCategories();
  }

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + userAuth?.token
      }
    }).then(res => {
      if (res.statusText === "OK") {
        SuccessMessage(res.data.successMessage)
        getAllCategories();
      } else {
        ErrorMessage(res.data.errorMessage)
      }
    })

  }


  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a._id.length - b._id.length,
      render: (_, { _id }) => (
        <>
          <div className='text-[#0094DA] text-[12px] font-[500]'>{_id}</div>
        </>
      ),
    },
    {
      title: 'Picture',
      sorter: false,
      render: (_, { file }) => (
        <>
          <div className='nameAndPic w-full flex justify-between'>
            <div className='flex items-center gap-2'>
              <div className='profileImg'>
                <img src={file?.url} alt="Category" width={32} height={32} className="rounded-[50%]" />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
    },
    {
      title: 'Actions',
      render: (_, cat) => (
        <>
          <div className='flex items-center gap-4'>
            <button className='btn' style={{ textDecoration: 'none' }}><UpdateCategories updateFunction={updateFunction} cat={cat} userAuth={userAuth} /></button>
            <button className='btn' onClick={() => deleteHandler(cat._id)}><DeleteOutlined /></button>
          </div>
        </>
      ),
    },
  ];

  return (
    <AdminLayout sidebar>
      <div className='categories'>
        {/* Create categories */}
        <div className='flex justify-end gap-4 my-4'>
          <div>
            <CreateMainCategories updateFunction={updateFunction} userAuth={userAuth} />
          </div>
        </div>

        {/* Show categories */}
        <Table showSorterTooltip columns={columns} pagination={false} dataSource={categories} />
      </div>
    </AdminLayout>
  )
}


export default GetCategories;