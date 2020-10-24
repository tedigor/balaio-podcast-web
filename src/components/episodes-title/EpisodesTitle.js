import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15vw',
        marginBottom: '7vh'
    },
    texts: {
        textAlign: 'start',
    }
});

const EpisodesTitle = ({ title }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.texts}>
                <Typography variant="h3" component="h3" >
                    Episódios
			    </Typography>
            </div>
        </div>
    );
};

export default EpisodesTitle;