import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import specialities from "../../assets/specialities.json"

const SmallBlogCard = ({ blog }) => {
    const { i18n } = useTranslation();
    const filterSpec = specialities?.filter(f => f.fr === blog?.category)[0];
    return (
        <div className='SmallBlogCard'>
            <div className='mainImg'>
                <img src={blog?.picture?.url} alt='doc' className='max-w-[200px] max-h-[100px]' />
            </div>
            <div className='inner'>
                <h6 className='text-left rtl:text-start'>{i18n.language === "ar" ? filterSpec?.ar : filterSpec?.fr}</h6>
                <div className='dateCon'>
                    <CalendarOutlined />
                    <span>{moment(blog?.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <h2 className='rtl:text-start'>{blog?.title}</h2>
            </div>
        </div>
    )
}

export default SmallBlogCard
