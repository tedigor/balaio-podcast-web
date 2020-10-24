import React, { useState } from 'react';


export const EpisodeContext = React.createContext();

export const EpisodeProvider = ({ children }) => {

    const [open, setOpen] = useState();
    const [iframe, setIframe] = useState();

    const playEpisode = (iframe) => {
        setIframe(<iframe title="episode-frame" src={iframe} width="100%" frameBorder="0" scrolling="no"></iframe>);
        setOpen(true);
    }

    return (
        <EpisodeContext.Provider value={{ open, setOpen, iframe, setIframe, playEpisode }}>
            {children}
        </EpisodeContext.Provider>
    );
}

export default EpisodeContext;