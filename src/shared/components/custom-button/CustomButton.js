import React from 'react'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  typography: {
    button: {
    }
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#ffc000',
      dark: '#e2b11a',
      contrastText: '#662c00',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CustomButton = ({ variant, children, color, ...props }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Button variant={variant} color={color} className={classes.margin} {...props}>
        {children}
      </Button>
    </ThemeProvider>
  )
};

export default CustomButton;
