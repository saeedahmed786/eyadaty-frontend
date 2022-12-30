import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'

const BlogCard = ({ blog }) => {
    return (
        <div className='BlogCard'>
            <div className='mainImg border rounded-[16px]'>
                <img src={blog?.picture?.url} alt='doc' className='max-h-[300px] min-w-[30vw] w-full rounded-[16px]' />
            </div>
            <div className='inner'>
                <h6>{blog?.category?.name}</h6>
                <div className='dateCon'>
                    <CalendarOutlined />
                    <span>{moment(blog.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <h2 className="blogTitle">{blog?.title}</h2>
                <div className='nameAndPic'>
                    <img src={blog?.user?.picture?.url} alt='name' width={25} height={25} />
                    <span>{blog?.user?.fullName}</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: blog?.description }} className="blogDesc"></p>
            </div>
        </div>
    )
}

export default BlogCard
