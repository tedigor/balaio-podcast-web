import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import http from '../../../core/http/axios';
import API_ENDPOINTS from '../../../core/http/api-endpoints';

import CustomCarousel from "../../../components/carousel/CustomCarousel";
import Episodes from "../../../components/episodes/Episodes";
import HomeTitle from "../../../components/home-title/HomeTitle";


const useStyles = makeStyles({
  texts: {
    w_idth: "100%",
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15vw',
    textAlign: 'start',
    marginBottom: '3vh'
  },
});

const Home = () => {

  const [episodes, setEpisodes] = useState([]);
  const [highlights, setHighlights] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    http.get(API_ENDPOINTS.publicEpisodes).then(res => {
      return res.data;
    }).then(res => {
      setEpisodes(res);
    });

    http.get(API_ENDPOINTS.highlights).then(res => {
      return res.data;
    }).then(res => {
      setHighlights(res);
    })
  }, []);

  return (
    <div className="home">
      <HomeTitle />
      <div className={classes.texts}>
        <Typography variant="h5">
          Destaques
				</Typography>
      </div>
      <CustomCarousel episodes={highlights} />
      <div className={classes.texts}>
        <Typography variant="h5">
          Mais Episódios
				</Typography>
      </div>
      <Episodes episodes={episodes} />
    </div>
  );
};

export default Home;
