import { Input, Select } from 'antd'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from "../../assets/search.svg"
import DownArrow from "../../assets/DownArrow.svg"
import { useTranslation } from 'react-i18next';

const SelectBoxWidthSearch = ({ label, placeholder, data, handleUpdate, prevValue }) => {
    const [name, setName] = useState('');
    const [defaultValue, setDefaultValue] = useState("");
    const inputRef = useRef(null);
    const { t, i18n } = useTranslation();

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setDefaultValue(prevValue);

        return () => {

        }
    }, []);

    // console.log(defaultValue)

    return (
        <>
            <div className='SelectBox relative'>
                <label>{label}</label>
                <br />
                <Select
                    className='w-full'
                    placeholder={t(`${placeholder}`)}
                    options={data?.filter(f => f?.fr?.toLowerCase().includes(name?.toLowerCase())).map((item) => ({
                        label: i18n.language === "fr" ? item?.fr : item?.ar,
                        value: item?.fr,
                    }))}
                    value={defaultValue}
                    onChange={(value) => { handleUpdate(value); setDefaultValue(value) }}
                    suffixIcon={<Image src={DownArrow} alt="Down Arrow" />}
                    dropdownRender={(menu) => (
                        <div className='selectDropdown w-full p-4'>
                            <Input
                                suffix={<Image src={SearchIcon} alt="Search" />}
                                placeholder={t("Recherche....")}
                                className='w-full'
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                            />
                            {menu}
                        </div>
                    )}
                />
            </div>
        </>
    )
}

export default SelectBoxWidthSearch
