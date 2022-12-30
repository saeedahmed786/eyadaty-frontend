import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/Layouts/Admin/AdminLayout'
import { ArrowUpOutlined } from '@ant-design/icons'
import RightIcon from '../../components/icons/righticon'
import PlusIcon from '../../components/icons/plusIcon'
import SelectBoxWidthSearch from '../../components/Inputs/SelectBox'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import { uploadFilesFun } from '../../components/UploadFile'
import { isAuthenticated } from '../../components/Auth/auth'
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages'
import axios from 'axios'
import specialitiesArray from "../../assets/specialities.json"
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const QuillToolbar = dynamic(import('../../components/QuillEditor'), { ssr: false })

const CreateBlog = () => {
    const [description, setDescription] = useState("");
    const [userAuth, setUserAuth] = useState();
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");

    const Formats = [
        "header",
        // "font",
        // "size",
        "bold",
        "italic",
        "underline",
        "align",
        "strike",
        "script",
        "blockquote",
        "background",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "code-block"
    ];

    const getAllCategories = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.statusText === "OK") {
                setCategories(res.data);
            } else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    }

    const handleFileUpload = (f) => {
        uploadFilesFun(f, userAuth?.token).then(res => {
            setUploadedFile(res)
        })
    }

    useEffect(() => {
        setUserAuth(isAuthenticated());
        getAllCategories()

        return () => {

        }
    }, []);


    const onFinish = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/add`, { title, category: categoryId, picture: uploadedFile, description }, {
            headers: {
                "authorization": "Bearer " + userAuth?.token
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.statusText === "OK") {
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };


    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6 md:max-w-[60vw]'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Ajouter un article</button>
                    </div>
                </div>
                <h1 className='bigTitle'>Ajouter un article</h1>
                <form className='mt-10' onSubmit={onFinish}>
                    <h4 className='subTitle'>Image de l’article</h4>
                    {
                        uploadedFile && uploadedFile?.url ?
                            <img src={uploadedFile?.url} className="rounded-[16px] h-[280px] w-full md:w-[292px]" width={80} alt="Profile" />
                            :
                            <div className='bg-white mt-3 border border-[#C0C5CE] rounded-[16px] h-[280px] w-full md:w-[292px] flex justify-center items-center'>
                                <PlusIcon />
                            </div>
                    }
                    <div className='relative mt-3'>
                        <span className="btn btn-primary btn-file">
                            <button className='uploadBtn flex items-center justify-center gap-2 w-full md:w-[292px]'>
                                <span>Ajouter un image</span>
                                <span className='arrowUp'><ArrowUpOutlined /></span>
                                <input type="file" accept='image/*' name='file' onChange={(e) => handleFileUpload(e.target.files[0])} />
                            </button>
                        </span>
                    </div>
                    <div className='mt-8'>
                        <h4 className='subTitle'>Information de l’article</h4>
                        <div className='mb-3'>
                            <label>Titre</label> <br />
                            <Input placeholder='Titre' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Catégorie</label> <br />
                            <SelectBoxWidthSearch prevValue={specialitiesArray[0]?.fr} data={specialitiesArray} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                        </div>
                        <div className='mb-3'>
                            <label>Contenue:</label> <br />
                            <ReactQuill
                                formats={Formats}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'],
                                        ['blockquote', 'code-block'],
                                        [{ 'header': 1 }, { 'header': 2 }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        [{ 'script': 'sub' }, { 'script': 'super' }],
                                        [{ 'indent': '-1' }, { 'indent': '+1' }],
                                        [{ 'direction': 'rtl' }],
                                        // [{ 'size': ['small', 'large', 'huge'] }],
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'font': [] }],
                                        [{ 'align': [] }],
                                        ['clean']
                                    ],
                                }}
                                theme="snow"
                                onChange={(data) => setDescription(data)}
                                placeholder="Write description" />
                        </div>
                        <div className='mb-3'>
                            <button type='submit' className='bg-[#0094DA] rounded-[12px] text-white h-[48px] w-full md:w-[auto] px-12 text-[16px] font-[500]'>
                                Ajouter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default CreateBlog
