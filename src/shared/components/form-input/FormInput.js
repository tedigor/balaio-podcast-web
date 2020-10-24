import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './FormInput.scss';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const FormInput = ({ handleChange, label, placeholder, variant, ...props }) => {

  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      label={label}
      variant={variant ? variant : "filled"}
      {...props}
      onChange={handleChange}
      placeholder={placeholder} />);
}

export default FormInput;