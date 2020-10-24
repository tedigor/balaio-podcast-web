import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './EpisodesForm.scss';

import FormInput from '../../shared/components/form-input/FormInput';
import CustomButton from '../../shared/components/custom-button/CustomButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import http from '../../core/http/axios';
import Checkbox from '@material-ui/core/Checkbox';
import API_ENDPOINTS from '../../core/http/api-endpoints';
import EpisodesTitle from '../episodes-title/EpisodesTitle';


const EpisodesForm = (props) => {

    const { id } = useParams();
    const history = useHistory();

    const [episodeForm, setEpisodeForm] = useState();

    useEffect(() => {
        if (!id) {
            setEpisodeForm({
                name: '',
                description: '',
                imageUrl: '',
                episodeNumber: '',
                time: '',
                date: '',
                episodeSrc: '',
                isHighlighted: true
            })
        } else {
            http.get(`${API_ENDPOINTS.publicEpisodes}/${id}`).then(res => {
                return res.data;
            }).then(res => {
                setEpisodeForm(res);
            });
        }
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setEpisodeForm({ ...episodeForm, [name]: value });
        checkErrors();
    }

    const handleCheckChange = e => {
        const { checked } = e.target;
        setEpisodeForm({ ...episodeForm, isHighlighted: checked });
        checkErrors();
    }

    const navigate = () => {
        history.push('/private/episodes');
    }

    const hadleSubmit = event => {
        event.preventDefault();
        if (id) {
            http.put(`${API_ENDPOINTS.episodes}/${id}`, episodeForm).then(navigate);
        } else {
            http.post(API_ENDPOINTS.episodes, episodeForm).then(navigate);
        }
    }

    const checkErrors = () => {
        // setValid(episodeForm.name == null);
    }

    return episodeForm ? (
        <div className="episodes-container">
            <EpisodesTitle />

            <div className="form-container">
                <div className="title">
                    <h2>Novo Episódio</h2>
                </div>
                <form className="episodes-form" onSubmit={hadleSubmit}>
                    <FormInput
                        className="input"
                        name="name"
                        type="text"
                        value={episodeForm.name}
                        required
                        label="Nome"
                        placeholder="Nome do Episódio"
                        handleChange={handleChange} />

                    <FormInput
                        name="description"
                        multiline
                        className="input"
                        type="text"
                        value={episodeForm.description}
                        required
                        label="Descrição"
                        placeholder="Descrição"
                        handleChange={handleChange} />

                    <FormInput
                        name="imageUrl"
                        className="input"
                        type="text"
                        value={episodeForm.imageUrl}
                        required
                        label="Url da Imagem"
                        placeholder="Url"
                        handleChange={handleChange} />

                    <FormInput
                        name="episodeNumber"
                        className="input"
                        type="text"
                        value={episodeForm.episodeNumber}
                        required
                        label="Número do episódio"
                        placeholder="Número"
                        handleChange={handleChange} />

                    <FormInput
                        name="time"
                        className="input"
                        type="text"
                        value={episodeForm.time}
                        required
                        label="Duração"
                        placeholder="Duração"
                        handleChange={handleChange} />

                    <FormInput
                        name="date"
                        className="input"
                        type="text"
                        value={episodeForm.date}
                        required
                        label="Data de lançamento"
                        placeholder="Data"
                        handleChange={handleChange} />

                    <FormInput
                        name="episodeSrc"
                        className="input"
                        type="text"
                        value={episodeForm.episodeSrc}
                        required
                        label="Link do Episódio"
                        placeholder="Link"
                        handleChange={handleChange} />

                    <FormControlLabel control={
                        <Checkbox
                            name="isHighlighted"
                            checked={episodeForm.isHighlighted} />}
                        label="Destaque"
                        onChange={handleCheckChange} />

                    <CustomButton
                        type="submit"
                        value="Submit Form"
                        color="primary"
                        variant="contained">
                        {id ? 'Atualizar' : 'Cadastrar'}
                    </CustomButton>

                </form>
            </div>
        </div>
    ) : null;
};

export default EpisodesForm;