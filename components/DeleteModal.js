import React, { useState } from 'react'
import Trash from "../assets/trash.svg"
import CloseIcon from "../assets/closeIcon.svg"
import { Modal } from 'antd'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const DeleteModal = ({ deleteBtn, deleteFun, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='p-0' onClick={showModal}>
                {deleteBtn}
            </button>
            <Modal centered className='deleteModal' title={false} footer={false} visible={isModalOpen} onCancel={handleCancel}>
                <div>
                    <div className='text-end closeIcon'>
                        <button onClick={handleCancel}>
                            <Image src={CloseIcon} alt="CloseIcon" />
                        </button>
                    </div>
                    <div className='text-center'>
                        <Image src={Trash} alt="Trash" />
                        <h2 className='mt-4'>
                            {t("Voulez-vous vraiment supprimer l'élément ?")}
                        </h2>
                        <div className='mt-8 flex justify-between gap-4'>
                            <button onClick={() => { deleteFun(id); handleCancel }}>{t("Supprimer")}</button>
                            <button onClick={handleCancel}>{t("Annuler")}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal
