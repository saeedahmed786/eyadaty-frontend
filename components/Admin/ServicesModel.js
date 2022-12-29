import React, { useEffect, useState } from 'react'
import CloseIcon from "../../assets/closeIcon.svg"
import { Input, Modal } from 'antd'
import Image from 'next/image'
import Tick from "../../assets/Tick-Square.svg"

const ServicesModal = ({ handleUpdate, updatedItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemNote, setItemNote] = useState("");
    const [show, setShow] = useState(false);
    const [services, setServices] = useState([
        "Abdomino-pelviene",
        "Acupuncture",
        "Allergologie",
        "Auriculothérapie",
        "Cironcision",
        "Consultation générale",
        "Consultation à domicile",
        "Cupping",
        "Diabète",
        "ECG",
        "Echographie",
        "Goitre",
        "Holter tensionnel",
        "Hypèrtension",
        "Injections",
    ])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const toggleItem = (item) => {
        if (items.includes(item)) {
            setItems(items.filter((i) => i !== item));
        } else {
            setItems([...items, item]);
        }
    };


    useEffect(() => {
        setItems(updatedItems)

        return () => {

        }
    }, [updatedItems]);




    return (
        <>
            <button type='button' onClick={showModal} className='text-[#0094DA] font-[500]'>Ajouter les services</button>
            <Modal centered className='notesModal' closeIcon={false} title={false} footer={false} visible={isModalOpen} onCancel={handleCancel}>
                <div>
                    <div className='flex justify-between items-center closeIcon'>
                        <h4 className='subTitle'>Services *</h4>
                        <button onClick={handleCancel}>
                            <Image src={CloseIcon} alt="CloseIcon" />
                        </button>
                    </div>
                    <div className='mt-6'>
                        {
                            services?.map(service => {
                                return (
                                    <a onClick={() => toggleItem(service)} key={service} className='flex border-b-[1px] py-3 border-[#C0C5CE] items-center justify-between'>
                                        <div>{service}</div>
                                        {
                                            items?.includes(service) &&
                                            <div> <Image src={Tick} alt="Tick" /></div>
                                        }
                                    </a>
                                )
                            })
                        }
                    </div>
                    <div className='mt-6'>
                        <div className='text-center'>
                            <button onClick={() => setShow(!show)} className='text-[#0094DA] font-[500]'>Ajouter les services</button>
                        </div>
                        {
                            show &&
                            <Input
                                type="text"
                                className='mt-4'
                                placeholder='Autre service'
                                value={itemNote}
                                onPressEnter={() => setServices([...services, itemNote])}
                                onChange={(event) => setItemNote(event.target.value)}
                            />
                        }
                    </div>
                    <div className='mt-8'>
                        <button className='w-full bg-[#0094DA] rounded-[12px] h-[48px] text-white mb-4' onClick={() => handleUpdate(items)}>Supprimer</button> <br />
                        <button className='w-full bg-[#C0C5CE] rounded-[12px] h-[48px] text-black' onClick={handleCancel}>Annuler</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ServicesModal
