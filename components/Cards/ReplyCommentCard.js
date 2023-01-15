import React from 'react'
import CommentCard from './CommentCard';

const ReplyCommentCard = ({ comments, pageId, handleUpdate, parentId }) => {

    return (
        comments?.map(comment => {
            return (
                comment.responseTo === parentId &&
                <div className='my-[32px]'>
                    <CommentCard pageId={pageId} comment={comment} handleUpdate={handleUpdate} />
                    <ReplyCommentCard pageId={pageId} parentId={comment._id} comments={comments} handleUpdate={handleUpdate} />
                </div>
            )
        })
    )
}

export default ReplyCommentCard
