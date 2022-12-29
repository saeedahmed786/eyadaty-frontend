import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'

const SmallBlogCard = ({ blog }) => {
    return (
        <div className='SmallBlogCard'>
            <div className='mainImg'>
                <img src={blog?.picture?.url} alt='doc' className='max-w-[200px] max-h-[100px]' />
            </div>
            <div className='inner'>
                <h6 className='text-left'>{blog?.category}</h6>
                <div className='dateCon'>
                    <CalendarOutlined />
                    <span>{moment(blog?.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <h2>{blog?.title}</h2>
            </div>
        </div>
    )
}

export default SmallBlogCard
