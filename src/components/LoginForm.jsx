import React from 'react'
import { TextField, Grid, Checkbox, Button, Typography, makeStyles, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";


import { signupRoute } from '../routes/endpoints';


const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    center: { textAlign: 'center' },
    border: { textAlign: 'center', border: "1px solid #eee", background: "#fff" },
}));


export default function LoginForm() {
    const { register, handleSubmit, errors } = useForm();

    const classes = useStyles();
    
    const handleLogin = data => {
        console.log(data)
    }


    return (
        <>

            <Typography component="h1" variant="h5">  Login </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit(handleLogin)}>
                <TextField
                    defaultValue=""
                    // onChange={handleChange}
                    ref={register({
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                    })}
                    margin="normal"

                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"

                />
                {errors.email && <Typography component="p" color="secondary">  Email is required </Typography>}
                <TextField
                    defaultValue=""
                    // onChange={handleChange}
                    ref={register({ required: true })}
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                {errors.password && <Typography component="p" color="secondary">  Password is required </Typography>}
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
                // disabled={!loginCredentials.email.length || !loginCredentials.password.length}
                // onClick={handleLogin}
                >
                    Sign In
          </Button>

                <Box className={classes.center} mt={3}>
                    <Link to={signupRoute} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>

            </form>
        </>
    )
}
