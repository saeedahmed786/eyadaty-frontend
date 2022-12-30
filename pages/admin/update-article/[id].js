import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/Layouts/Admin/AdminLayout'
import { ArrowUpOutlined } from '@ant-design/icons'
import RightIcon from '../../../components/icons/righticon'
import PlusIcon from '../../../components/icons/plusIcon'
import SelectBoxWidthSearch from '../../../components/Inputs/SelectBox'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
import { uploadFilesFun } from '../../../components/UploadFile'
import { isAuthenticated } from '../../../components/Auth/auth'
import { ErrorMessage, SuccessMessage } from '../../../components/Messages/messages'
import axios from 'axios'
import { Loading } from '../../../components/Loading/Loading'
import specialitiesArray from "../../../assets/specialities.json"
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const QuillToolbar = dynamic(import('../../../components/QuillEditor'), { ssr: false });

const UpdateArticle = () => {
    const [blog, setBlog] = useState({});
    const [blogId, setBlogId] = useState("");
    const [description, setDescription] = useState("");
    const [userAuth, setUserAuth] = useState();
    const [loading, setLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");

    console.log(categoryId)


    const Formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'size',
        'video',
        'align',
        'background',
        'direction',
        'code-block',
        'code',
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

    const getBlogById = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/get/${id}`).then(res => {
            if (res.statusText === "OK") {
                setBlog(res.data)
                setTitle(res.data?.title)
                setDescription(res.data?.description)
                setUploadedFile(res.data?.picture)
                setCategoryId(res.data?.category?._id)
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
        setBlogId(window.location.pathname.split("article/")[1]);
        getBlogById(window.location.pathname.split("article/")[1])
        setUserAuth(isAuthenticated());
        getAllCategories()

        return () => {

        }
    }, []);


    const onFinish = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/update/${blogId}`, { title, category: categoryId, picture: uploadedFile, description }, {
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

    console.log(blog)

    return (
        <AdminLayout sidebar>
            <div className='Pages pt-6 max-w-[60vw]'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 justify-center items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <button className='text-[#0094DA]'>Ajouter un article</button>
                    </div>
                </div>
                <h1 className='bigTitle'>Ajouter un article</h1>
                {
                    loading ?
                        <Loading />
                        :
                        <form className='mt-10' onSubmit={onFinish}>
                            <h4 className='subTitle'>Image de l’article</h4>
                            {
                                uploadedFile && uploadedFile?.url ?
                                    <img src={uploadedFile?.url} className="rounded-[16px] h-[280px] w-[292px]" width={80} alt="Profile" />
                                    :
                                    <div className='bg-white mt-3 border border-[#C0C5CE] rounded-[16px] h-[280px] w-[292px] flex justify-center items-center'>
                                        <PlusIcon />
                                    </div>
                            }
                            <div className='relative mt-3'>
                                <span className="btn btn-primary btn-file">
                                    <button className='uploadBtn flex items-center justify-center gap-2 w-[292px]'>
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
                                    <Input value={title} placeholder='Titre' onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                {
                                    blog?.category &&
                                    <div className='mb-3'>
                                        <SelectBoxWidthSearch prevValue={blog.category} label="Category" data={specialitiesArray} handleUpdate={(value) => setCategoryId(value)} placeholder="Catégorie" />
                                    </div>
                                }
                                <div className='mb-3'>
                                    <label>Contenue:</label> <br />
                                    <ReactQuill
                                        formats={Formats}
                                        value={description}
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
                                    <button type='submit' className='bg-[#0094DA] rounded-[12px] text-white h-[48px] px-12 text-[16px] font-[500]'>
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </form>
                }
            </div>
        </AdminLayout>
    )
}

export default UpdateArticle
