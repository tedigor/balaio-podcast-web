import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PlayArrow from '@material-ui/icons/PlayArrow';
import CustomButton from '../../shared/components/custom-button/CustomButton';

import './EpisodeInfo.scss';

const EpisodeInfo = ({ episode, play }) => {

    const [value, setValue] = React.useState(5);

    return (
        <div className="episode-info">
            <section>
                <h3 className="episode-number">Episódio {episode.episodeNumber}</h3>
                <h1 className="episode-title">{episode.name}</h1>
                <div className="subtitles">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <span className="episode-comments-number">0 Comentários</span>
                </div>
            </section>
            <section>
                <div className="description">
                    <p>
                        {episode.description}
                    </p>
                </div>
            </section>

            <section>
                <div className="participants-avatars">
                    <Avatar
                        className="avatar"
                        onClick={() => { window.open('https://www.instagram.com/tedmedeiros/')}}
                        src="https://scontent.frec3-2.fna.fbcdn.net/v/t1.0-9/1902801_636278386432219_1791449983_n.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_eui2=AeHt935R5nmQhJ_QrOxX83ljf2Dc6a_Qbv5_YNzpr9Bu_rFlxWsIRkGnd_ESBemZsALsQiwFqVc-hi4fKRhIsX3O&_nc_ohc=h1yezMjpDFIAX8gRASw&_nc_ht=scontent.frec3-2.fna&oh=9b3de121377839bef34eebfde22e0ff0&oe=5F98FA57">
                        TI
                    </Avatar>
                </div>
            </section>

            <Divider variant="middle" className="divider" />

            <section>
                <div className="buttons">
                    <CustomButton
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={play}
                        startIcon={<PlayArrow />}
                    >
                        Ouvir
                    </CustomButton>
                </div>

            </section>

        </div>
    );
}

export default EpisodeInfo;