import React, { useState } from 'react'
import moment from 'moment';
import { isAuthenticated } from '../Auth/auth';
import axios from 'axios';
import { ErrorMessage, SuccessMessage } from '../../components/Messages/messages';
import { useTranslation } from 'react-i18next';

const AddComment = ({ pageId, handleUpdate }) => {
    const [text, setText] = useState("");
    const { t } = useTranslation();

    const addComment = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/add`, { pageId, text, timeOfSubmit: moment().format('dddd, MMMM Do YYYY, h:mm:ss a') }, {
            headers: {
                "authorization": "Bearer " + isAuthenticated()?.token
            }
        }).then(res => {
            if (res.statusText === "OK") {
                handleUpdate(res.data.comment)
                SuccessMessage(res.data.successMessage);
            }
            else {
                ErrorMessage(res.data.errorMessage);
            }
        })
    };

    return (
        <div className='AddComment'>
            <h3>{t("Ajouter un commentaire")}</h3>
            <div className='my-2'>
                <label>{t("Commentaire")}</label>
                <br />
                <textarea onChange={(e) => setText(e.target.value)} placeholder={t('Commentaire')} />
            </div>
            <div>
                <button onClick={addComment}>{t("Commenter")}</button>
            </div>
        </div>
    )
}

export default AddComment
