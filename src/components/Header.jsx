import React from 'react'
import { loginRoute, signupRoute, dashboard, profileRoute, destinationRoute } from '../routes/endpoints'
import { Link, useHistory } from 'react-router-dom'

import { AppBar, Button, Toolbar, Typography, Container, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../firebase';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: "13px"
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
    color: "#fff",
    fontWeight: "600",
    border: "none",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


export default function Header() {
  const classes = useStyles();

  const history = useHistory();
  const { currentUser, setError } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // No need to manually route change cz AuthContext will reset state & privateRoute will change routing
      // history.push(loginRoute);
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <React.Fragment>

      {/* <CssBaseline /> */}
      <AppBar position="static" color="transparent" elevation={3} className={classes.appBar}>
        <Container>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.toolbarTitle}>
              <Link to={dashboard} >
                <img src="logo192.png" style={{ width: "80px" }} alt="Rural Riders" /> </Link>
            </Typography>
            <nav>
              

              {!currentUser.email && <Link variant="outlined" color="textPrimary" to={signupRoute} className={classes.link}>
                Sign Up
            </Link>}

            </nav>


            {currentUser.email && (
              <Link variant="outlined" color="textPrimary" to={profileRoute} style={{
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                < Avatar alt={currentUser?.name
                } src={`${currentUser?.photoURL}`} />
                <strong className={classes.link}> {currentUser?.name} </strong>
              </Link>
            )
            }

            {!currentUser.email ? <Button onClick={() => history.push(loginRoute)} className={classes.link} variant="contained" color="secondary" >
              Login
          </Button> : <Button onClick={() => handleSignOut()} className={classes.link} variant="contained" color="secondary" >
                Sign Out
          </Button>}

          </Toolbar>

        </Container>

      </AppBar>
    </React.Fragment >
  );
}
