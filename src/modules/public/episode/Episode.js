import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import http from '../../../core/http/axios';
import API_ENDPOINTS from '../../../core/http/api-endpoints';

import EpisodeContext from '../../../contexts/EpisodeContext';

import EpisodeInfo from '../../../components/episode-info/EpisodeInfo';
import Comments from '../../../components/comments/Comments';

import './Episode.scss';

const Episode = (props) => {

    let { id } = useParams();
    const [episode, setEpisode] = useState([]);
    const { playEpisode } = useContext(EpisodeContext);


    useEffect(() => {
        http.get(`${API_ENDPOINTS.publicEpisodes}/${id}`).then(res => {
            return res.data;
        }).then(res => {
            setEpisode(res);
        });
    }, [id]);

    return (
        <div className="episode-container">
            <section>
                <div className="episode">
                    <div className="image">
                        <LazyLoadImage
                            src={episode.imageUrl}
                            alt={episode.name} width={500} height={600} />
                    </div>
                    <div className="info">
                        <EpisodeInfo episode={episode} play={() => playEpisode(episode.episodeSrc)} />
                    </div>
                </div>
            </section>
            <section>
                <div className="comments-row">
                    <div className="comments">
                        <Comments episodeId={id} />
                    </div>
                </div>
            </section>

        </div>
    );

}

export default Episode;