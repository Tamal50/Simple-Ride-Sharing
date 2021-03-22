import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useAuth } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router';
// import { Redirect } from 'react-router-dom';


import { Link } from 'react-router-dom';
import { dashboard, signupRoute } from '../routes/endpoints';
import { Checkbox } from '@material-ui/core';
import { signIn } from '../firebase';
import userObject from '../utils/userObject';

import SocialLogin from '../components/SocialLogin';
// import LoginForm from '../components/LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';



const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  center: { textAlign: 'center' },
  border: { textAlign: 'center', border: "1px solid #eee", background: "#fff" },
}));

export default function SignIn() {
  const classes = useStyles();
  const { setCurrentUser, error, setError, setLoading } = useAuth();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: dashboard } };

  const [loginCredentials, setloginCredentials] = useState({ email: "", password: "" })


  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = loginCredentials

      if (email.length && password.length) {
        setLoading(true);
        let result = await signIn(email, password);


        setError("")
        const newUser = userObject(result.user);
        console.log(newUser);
        setCurrentUser(newUser);

        history.push(from);
        setLoading(false);

      } else {
        setLoading(false);
        setError("Email or password must be included properly")
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(`handleLogin =>   ${error.message}`);
    }
  }

  const handleChange = (e) => {
    const newData = { ...loginCredentials }
    newData[e.target.name] = e.target.value
    setloginCredentials(newData)
  }


  const renderView = () => {
    return <Container component="main" maxWidth="xs" className={classes.border}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FontAwesomeIcon icon={faReact} />
        </Avatar>

        {error && <Typography component="p" color="secondary">  {error} </Typography>}
        <Typography component="h1" variant="h5">  Login </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            defaultValue=""
            onChange={handleChange}
            margin="normal"

            fullWidth
            id="email"
            label="Email Address"
            name="email"

          />

          <TextField
            defaultValue=""
            onChange={handleChange}
            variant="outlined"
            margin="normal"

            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Grid container>
            <Grid item xs>
              <Checkbox /> Remember Me
            </Grid>
            <Grid item >
              <Link to="/forget" variant="body2" mt={4}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!loginCredentials.email.length || !loginCredentials.password.length}
            onClick={handleLogin}
          >
            Sign In
          </Button>

          <Box className={classes.center} mt={3}>
            <Link to={signupRoute} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>

        </form>
      </div>

      <SocialLogin />

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  }

  return <>
    {renderView()}
  </>
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://github.com/Tamal50">
        React-auth
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}