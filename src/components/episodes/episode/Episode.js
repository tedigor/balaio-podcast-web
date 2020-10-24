import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';

import './Episode.scss';



const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    display: 'flex',
    height: 200,
    boxShadow: 'none',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    minWidth: 200
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#572814'
  },
  description: {
    paddingBottom: '5px'
  },
  dateTime: {
    color: '#747478'
  },
  actions: {
    display: 'flex',
    width: '100%',
    padding: 0,
    height: '50px'
  }
});

const Episode = ({ _id, imageUrl, name, description, time, date }) => {

  const classes = useStyles();
  const history = useHistory();

  const formatDescriptino = (description) => {
    return description.substring(1, 200).concat('...');
  }

  return (
    <div className="episode">
      <Card className={classes.root}>
        <CardActionArea className={classes.root} onClick={() => history.push(`/episodes/${_id}`)}>
          <CardMedia
            className={classes.image}
            component="img"
            image={imageUrl}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h6" className={classes.title}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
              {formatDescriptino(description)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.dateTime}>
              {date} • {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Episode
