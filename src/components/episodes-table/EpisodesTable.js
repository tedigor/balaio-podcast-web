import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import API_ENDPOINTS from '../../core/http/api-endpoints';
import http from '../../core/http/axios';
import Checkbox from '@material-ui/core/Checkbox';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import Done from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircle from '@material-ui/icons/CheckCircle'
import { useHistory } from 'react-router-dom';

import './EpisodesTable.scss';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#ffc000',
        color: '#662c00',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const EpisodesTable = () => {
    const classes = useStyles();

    const [episodes, setEpisodes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        http.get(API_ENDPOINTS.episodes).then((response) => {
            setEpisodes(
                response.data.map(ep => {
                    return {
                        ...ep
                    }
                })
            );
        })

    }, [])

    const navigateTo = (route) => {
        history.push(route);
    }

    const handleisHighlightedChange = (e, episode) => {
        const { checked } = e.target;
        http.put(`${API_ENDPOINTS.episodes}/${episode._id}/highlight`, { isHighlighted: checked })
            .then(res => {
                return episodes.map(ep => {
                    if (ep._id === res.data._id) {
                        ep.isHighlighted = checked;
                    }
                    return ep;
                })
            }).then(res => {
                setEpisodes(res);
            })

    }

    const deactivateEp = (id) => {
        http.delete(`${API_ENDPOINTS.episodes}/${id}`).then(res => {
            return episodes.map(ep => {
                if (ep._id === id) {
                    ep.active = false;
                }
                return ep;
            })
        }).then(res => {
            setEpisodes(res);
        })
    }

    const activeEp = (id) => {
        http.put(`${API_ENDPOINTS.episodes}/${id}/activate`).then(res => {
            return episodes.map(ep => {
                if (ep._id === id) {
                    ep.active = true;
                }
                return ep;
            })
        }).then(res => {
            setEpisodes(res);
        })
    }

    return episodes ? (
        <div className="episodes-container">
            <div className="title">
                <h2>Lista de episódios</h2>
                <IconButton color="primary" className="add-button" aria-label="delete" onClick={() => navigateTo('/private/episodes/new')}>
                    <Add />
                </IconButton>
            </div>
            <div className="episodes-table">
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Destaque</StyledTableCell>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell align="left">Data</StyledTableCell>
                                <StyledTableCell align="left">Número</StyledTableCell>
                                <StyledTableCell align="left">Descrição</StyledTableCell>
                                <StyledTableCell align="left">ImagemUrl</StyledTableCell>
                                <StyledTableCell align="left">Link do Episódio</StyledTableCell>
                                <StyledTableCell align="left">Ações</StyledTableCell>
                                <StyledTableCell align="left">Ativo</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {episodes.map((row) => (
                                <StyledTableRow key={row.name} >
                                    <StyledTableCell align="left">
                                        <Checkbox
                                            onChange={(e) => handleisHighlightedChange(e, row)}
                                            checked={row.isHighlighted}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.date}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.episodeNumber}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ maxWidth: '350px' }} align="left">{row.description}</StyledTableCell>

                                    <StyledTableCell style={{ maxWidth: '350px' }} component="th" scope="row">
                                        <a href={row.imageUrl}>{row.imageUrl}</a>
                                    </StyledTableCell>
                                    <StyledTableCell style={{ maxWidth: '350px' }} component="th" scope="row">
                                        <a href={row.episodeSrc}>{row.episodeSrc}</a>
                                    </StyledTableCell>
                                    <StyledTableCell style={{ maxWidth: '350px' }} component="th" scope="row">
                                        <IconButton aria-label="delete" className={classes.margin} onClick={() => navigateTo(`/private/episodes/edit/${row._id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        {
                                            row.active ? 
                                                <IconButton aria-label="delete" className={classes.margin} onClick={() => deactivateEp(row._id)} >
                                                    <DeleteIcon />
                                                </IconButton> :
                                                <IconButton aria-label="delete" className={classes.margin} onClick={() => activeEp(row._id)} >
                                                    <Done />
                                                </IconButton>
                                        }

                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <CheckCircle style={{ color: row.active ? '#28a745' : '#343a40' }} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    ) : null;
}

export default EpisodesTable;