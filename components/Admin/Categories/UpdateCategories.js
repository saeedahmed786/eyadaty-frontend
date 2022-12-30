import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Input, Select } from 'antd';
import { ErrorMessage, SuccessMessage } from "../../../components/Messages/messages";
import { Loading } from "../../../components/Loading/Loading";


export const UpdateCategories = ({ updateFunction, userAuth, cat }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
    setName(cat.name);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    console.log('object')
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", name);
    if (file) {
      data.append("file", file);
    }
    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/update/${cat._id}`, data, {
      headers: {
        authorization: "Bearer " + userAuth?.token
      }
    }
    )
      .then((res) => {
        if (res.statusText === "OK") {
          setLoading(false);
          SuccessMessage(res.data.successMessage);
          updateFunction();
        } else {
          ErrorMessage(res.data.errorMessage);
        }
      });
  };

  return (
    <div>
      <button className="btn" onClick={showModal}><EditOutlined /></button>
      <Modal title="Update Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form className="text-center create-posts">
              <div className="mt-4">
                <Input
                  required
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={name}
                  placeholder="Enter Sub Category Title"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4 text-left">
                <input type="file" name='file' onChange={(e) => setFile(e.target.files[0])} />
                <br />
                {
                  file ?
                    <img className="mt-2" src={file !== '' ? URL.createObjectURL(file) : ''} alt="" width="60px" height="60px"></img>
                    :
                    <img className="mt-2" src={cat?.file?.url} alt="" width="60px" height="60px"></img>
                }
              </div>
              <div style={{ marginTop: '15px' }}>
                <button
                  onClick={submitHandler}
                  size="large"
                  className="bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6"
                >
                  Submit
                </button>
              </div>
            </form>
        }
      </Modal>
    </div>
  );
};