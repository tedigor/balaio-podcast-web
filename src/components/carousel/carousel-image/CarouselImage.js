import Card from '@material-ui/core/Card';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import React from 'react';
import { useHistory } from "react-router-dom";

import './CarouselImage.scss';

const useStyles = makeStyles({
  title: {
    color: '#572814'
  },
  description: {
  }
});

const CarouselImage = (props) => {

  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className="container">
      <div className="hightlighted-episode">
        <img src={props.item.imageUrl} alt="Logo" />;
      </div>
      <div className="h-episode-texts">
        <Typography variant="h3" component="h3" className={classes.title}>
          {props.item.name}
          </Typography>
        <Typography variant="body1" color="textSecondary" component="p" className={classes.description}>
          {props.item.description}
        </Typography>
        <Button size="large" color="primary" className="learn-more-button" onClick={() => history.push(`/episodes/${props.item._id}`)}>
          SAIBA MAIS
        </Button>
      </div>

    </Card>
  );

}

export default CarouselImage;
