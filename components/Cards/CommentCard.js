import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { ErrorMessage, SuccessMessage } from '../../Messages/messages';
import { isAuthenticated } from '../Auth/auth';

const CommentCard = ({ comment, pageId, handleUpdate }) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [liked, setLiked] = useState(false);
    const [disLiked, setDisLiked] = useState(false);

    const addComment = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/add`, { pageId, text, timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'), responseTo: comment._id }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate()
                // SuccessMessage(res.data.successMessage);
                setShow(false);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const addCommentLike = async (id) => {
        setLiked(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/like/${id}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate()
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const removeCommentLike = async (id) => {
        setLiked(false);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/remove/like/${id}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate()
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const addCommentDisLike = async (id) => {
        setDisLiked(true);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/dislike/${id}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate()
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    const removeCommentDisLike = async (id) => {
        setDisLiked(false);
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/remove/dislike/${id}`, { id: "" }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate()
                // SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    useEffect(() => {
        setLiked(comment?.likes?.includes(isAuthenticated()._id))
        setDisLiked(comment?.dislikes?.includes(isAuthenticated()._id))

        return () => {

        }
    }, [])


    return (
        <div className='CommentCard'>
            <div className='flex gap-4'>
                <div className='commentImg'> 
                    <img src={comment?.commentor?.picture?.url} alt='name' className='rounded-[50%] object-cover w-[48px] h-[48px]' />
                </div>
                <div className='w-[90%]'>
                    <strong>{comment?.commentor?.fullName}</strong>
                    <p className='normalPara my-2'>{comment?.text}</p>
                    <div className='reactionCont flex gap-8'>
                        {
                            liked ?
                                <button className='flex gap-2 items-center liked' onClick={() => removeCommentLike(comment._id)}>
                                    <LikeFilled />
                                    <span>Like</span>
                                </button>
                                :
                                <button className='flex gap-2 items-center' onClick={() => { addCommentLike(comment._id); removeCommentDisLike(comment._id) }}>
                                    <LikeOutlined />
                                    <span>Like</span>
                                </button>
                        }
                        {
                            disLiked ?
                                <button className='flex gap-2 items-center disliked' onClick={() => removeCommentDisLike(comment._id)}>
                                    <DislikeFilled />
                                    <span>Dislike</span>
                                </button>
                                :
                                <button className='flex gap-2 items-center' onClick={() => { addCommentDisLike(comment._id); removeCommentLike(comment._id) }}>
                                    <DislikeOutlined />
                                    <span>Dislike</span>
                                </button>
                        }
                        <button className='flex gap-2 items-center' onClick={() => setShow(!show)}>
                            <MessageOutlined />
                            <span>Reply</span>
                        </button>
                    </div>
                    {
                        show &&
                        <div className='w-full mt-4'>
                            <textarea className='w-[100vw]' placeholder='Reply' onChange={(e) => setText(e.target.value)} />
                            <div className='mt-4'>
                                <button className='h-[48px] bg-[#0094DA] px-6 rounded-[8px] text-white' onClick={addComment}>Commenter</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentCard
