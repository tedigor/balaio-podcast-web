import React from 'react';

import Typography from '@material-ui/core/Typography';

import './Comment.scss';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <Typography className="comment-user-name" variant="subtitle1" >
                {comment.userName}
            </Typography>
            <p style={{ width: '100%', textAlign: 'start', textJustify: 'justify !important' }}>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment;