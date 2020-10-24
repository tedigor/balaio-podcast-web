import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { ReactComponent as BalaioLogo } from "../../../assets/logo.svg";
import { ReactComponent as FacebookLogo } from "../../../assets/socials/facebook.svg";
import { ReactComponent as InstagramLogo } from "../../../assets/socials/instagram.svg";
import { ReactComponent as SpotifyLogo } from "../../../assets/socials/spotify.svg";
import IconButton from '@material-ui/core/IconButton';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';


// import { ReactComponent as YoutubeLogo } from "../../../assets/socials/youtube.svg";
// import { ReactComponent as TwitterLogo } from "../../../assets/socials/twitter.svg";
import "./Header.scss";

import SecurityContext from '../../../contexts/SecurityContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#ffc000",
    height: "8vh",
    display: "flex",
    justifyContent: "center",
    padding: "0 4vw",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  iconButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '15vw'
  },
  logo: {
    width: "5vh",
    height: "auto",
    marginRight: '20px'
  },
  icons: {
    width: "14vw",
    height: "auto",
    display: "flex",
    justifyContent: "space-around",
  },
  icon: {
    width: "3vh",
    minWidth: '20px',
    max: '25px',
    height: "auto",
    minHeight: '30px',
    cursor: 'pointer'
  },
  titles: {
    flexGrow: 1,
    marginLeft: "15px",
  },
  title: {
    flexGrow: 1,
    color: "black",
    textTransform: "uppercase",
  },
  subtitle: {
    flexGrow: 1,
    color: "#572814",
    fontSize: ".8rem",
  },
  navButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "10vw",
  },
  navButton: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'rgb(87, 40, 20)'
  }
}));

const Header = () => {

  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const options = [
    'Logout'
  ];

  const { isUserAuthenticated, isUserAdmin, logout } = useContext(SecurityContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    if (e === 'Logout') {
      logout();
    }
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openUrl = (url) => {
    window.open(url);
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.iconButtons}>
          <BalaioLogo className={classes.logo} />
          <Divider orientation="vertical" flexItem />
          <div className={classes.navButtons}>
            <Button className={classes.navButton} component={Link} to={`/`}>
              Home
              </Button>
            {
              isUserAuthenticated() && isUserAdmin() ?

                <Badge color="secondary" badgeContent={'G'} showZero>
                  <Button className={classes.navButton} component={Link} to={`/private/episodes`}>
                    Episódios
                  </Button>
                </Badge> : null
            }
            {
              !isUserAuthenticated() ?
                <Button className={classes.navButton} component={Link} to={`/login`}>
                  Login
              </Button> : null
            }
          </div>
        </div>
        <div className={classes.icons}>
          <SpotifyLogo style={{ marginLeft: '10px' }}
            className={classes.icon}
            onClick={() => openUrl('https://open.spotify.com/show/4uAA0AKp3wMuJ227Pfgv9k?si=Ojq5GWkHTFmO5rqkoixcqw')} />
          <InstagramLogo style={{ marginLeft: '10px' }}
            className={classes.icon}
            onClick={() => openUrl('https://www.instagram.com/balaiopodcast/')} />
          <FacebookLogo style={{ marginRight: '15px', marginLeft: '10px' }}
            className={classes.icon} onClick={() =>
              openUrl('https://www.facebook.com/balaiopodcast/')} />

          <Divider orientation="vertical" flexItem />

          {
            isUserAuthenticated() ?
              <div>
                <Divider orientation="vertical" flexItem />
                <IconButton className="user-icon" aria-label="delete" onClick={handleClick}>
                  <SupervisedUserCircle style={{ fill: '#572814' }} />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              : null
          }
        </div>


      </Toolbar>
    </AppBar>
  );
};

export default Header;
