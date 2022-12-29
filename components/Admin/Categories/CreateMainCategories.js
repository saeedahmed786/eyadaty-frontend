import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { ErrorMessage, SuccessMessage } from "../../../Messages/messages";
import { Loading } from "../../../Loading/Loading";

export const CreateMainCategories = ({ updateFunction, userAuth }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData();
    data.append("name", category);
    data.append("file", file);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/create`, data
        , {
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
          ErrorMessage(res.data.errorMessage)
        }
      });
  };

  return (
    <div>
      <button className='bg-[#0094DA] rounded-[12px] text-white h-[48px] px-6' onClick={showModal}>Create Category</button>
      <Modal title="New Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form onSubmit={submitHandler} className="text-center create-posts">
              <div className="mt-4">
                <Input
                  required
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Enter Category Title"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mt-4 text-left">
                <input required type="file" name='file' onChange={(e) => setFile(e.target.files[0])} />
                <br />
                {
                  file &&
                  <img className="mt-2" src={file !== '' ? URL.createObjectURL(file) : ''} alt="" width="60px" height="60px"></img>
                }
              </div>
              <div style={{ marginTop: '15px' }}>
                <button
                  type="submit"
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