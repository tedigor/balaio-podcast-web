import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		width: "100%",
		display: 'flex',
		flexDirection: 'column',
		padding: '0 15vw',
	},
	texts: {
		textAlign: 'start',
	},
	desc: {
		color: '#572814'
	},
	divider: {
		height: '5vh',
		// borderBottom: '1px solid #7070703d',
		borderBottom: '1px solid #ffc0003d',
		width: '70vw',
		marginBottom: '2vh'
	}
});

const HomeTitle = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.texts}>
				<Typography variant="h3" component="h3" >
					Balaio Podcast
				</Typography>
				<Typography className={classes.desc} variant="h6" gutterBottom>
				Podcast nordestino sobre cultura pop e tudo mais que couber no balaio.
				</Typography>
			</div>

			<div className={classes.divider}></div>
		</div>
	);
};

export default HomeTitle;
