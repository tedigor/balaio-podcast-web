import React, { useContext } from 'react';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import EpisodeContext from '../../../contexts/EpisodeContext';

import './EpisodeIframe.scss';

const EpisodeIframe = (props) => {

    const { open, setOpen, iframe } = useContext(EpisodeContext);

    return open ? (
        <div style={{ marginTop: '150px'}}>
            <div className="iframe-holder">
                <IconButton 
                style={{ display: open ? 'display' : 'hidden'}} 
                className="close-button" 
                aria-label="close" 
                color="primary"
                 onClick={() => setOpen(!open)}>
                    <Close />
                </IconButton>
                {iframe}
            </div>
        </div>

    ) : null;
}

export default EpisodeIframe;