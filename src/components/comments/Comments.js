import React, { useState, useEffect, useContext } from 'react'

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import http from '../../core/http/axios';
import SecurityContext from '../../contexts/SecurityContext';

import './Comments.scss';

import TextField from '@material-ui/core/TextField';

import Comment from './comment/Comment';
import API_ENDPOINTS from '../../core/http/api-endpoints';
import {
    Link,
} from "react-router-dom";

const Comments = ({ userName, episodeId }) => {

    const { user, isUserAuthenticated } = useContext(SecurityContext);
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({
        userName: user ? user.name : null, episodeId: episodeId, content: ''
    });
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        http.get(`${API_ENDPOINTS.comments}/${episodeId}`).then(res => {
            if (isMounted) {
                setComments(res.data);
            }
        })
        return () => { setIsMounted(false) };
    }, [comments, episodeId, isMounted])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentForm({ ...commentForm, [name]: value });
    }

    const handleClick = () => {
        http.post(API_ENDPOINTS.comments, commentForm).then(res => {
            setCommentForm({ userName: user ? user.name : null, episodeId: episodeId, content: '' })
            http.get(`${API_ENDPOINTS.comments}/${episodeId}`).then(res => {
                setComments(res.data);
            })
        })
    }

    const newComment = () => {
        return (
            <form>
                <TextField
                    name="content"
                    type="text"
                    label="Escreva um Comentário"
                    placeholder="Comentário"
                    variant="outlined"
                    value={commentForm.content}
                    multiline
                    style={{ width: '100%' }}
                    rowsMax={3}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="Enviar Comentário" onClick={handleClick}>
                                    <Send />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
        );
    }

    const noUserComment = () => {
        return (
            <Typography className="comments-title" variant="body1" gutterBottom>
                Para comentar se conecte ou realize o cadastro <Link to="/login">aqui</Link>
            </Typography>
        );
    }

    return (
        <div className="comments-section">
            <Typography className="comments-title" variant="h6" gutterBottom>
                Comentários
            </Typography>

            <div className="comments-list">
                {comments.map(comment => <Comment key={comment._id} comment={comment} />)}
                <div className="new-comment">
                    {isUserAuthenticated() ? newComment() : noUserComment()}
                </div>
            </div>



        </div>
    );
}

export default Comments;