
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useAuth } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { dashboard, loginRoute } from '../routes/endpoints';

import { signUp } from '../firebase';
import SocialLogin from '../components/SocialLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import userObject from '../utils/userObject';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://github.com/Tamal50">
        Rural Riders
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  social: {
    margin: theme.spacing(1, 0, 1),
    borderRadius: '10px 25px'
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

  const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "" })

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = signupCredentials

      if (email.length && password.length) {
        setLoading(true);
        let result = await signUp(email, password);
        setError("");
        const newUser = userObject(result.user);
        newUser['name'] = name;
        console.log({ newUser })
        setCurrentUser(newUser);
        setLoading(false);
        history.push(from)
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
    const newData = { ...signupCredentials }
    newData[e.target.name] = e.target.value
    setSignupCredentials(newData)
  }



  return (
    <Container component="main" maxWidth="xs" className={classes.border}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FontAwesomeIcon icon={faReact} />
        </Avatar>

        {error && <Typography component="p" color="secondary">  {error} </Typography>}
        <Typography component="h1" variant="h5">  Create an account   </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignup}>
          <TextField
            value={signupCredentials.name}
            onChange={handleChange}
            // ref={login}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            value={signupCredentials.email}
            onChange={handleChange}
            // ref={login}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={signupCredentials.password}
            onChange={handleChange}
            // ref={login}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={signupCredentials.password}
            onChange={handleChange}
            // ref={login}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Current Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <Box className={classes.center} mt={3}>
            <Link to={loginRoute} variant="body2">
              Already have an account? Sign in
              </Link>
          </Box>

        </form>
      </div>

      <SocialLogin />

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}