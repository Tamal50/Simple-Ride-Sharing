import React from 'react'
import { Box, makeStyles, Button } from '@material-ui/core';
import { googleProvider, signInWithPopup, githubProvider } from '../firebase';
import userObject from '../utils/userObject';
import { useHistory, useLocation } from 'react-router';
import { dashboard } from '../routes/endpoints';
import { useAuth } from '../context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";




const useStyles = makeStyles((theme) => ({
    border: { textAlign: 'center', border: "1px solid #eee", background: "#fff" },
    social: {
        margin: theme.spacing(1, 0, 1),
        borderRadius: '10px 25px'
    }
}));


export default function SocialLogin() {
    const { setCurrentUser, setError } = useAuth();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: dashboard } };

    const handleSocialLogin = async (provider) => {
        try {
            let result = await signInWithPopup(provider);
            setError("");
            let getUserData = userObject(result.user)
            setCurrentUser(getUserData)
            history.push(from)
        } catch (error) {
            setError(error.message)
            console.log(`handleSocialLogin =>   ${error.message}`);
        }
    }

    return (
        <Box p={2} mt={3} className={classes.border}>
            <h3> ----------- Or --------- </h3>
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.social}
                onClick={() => handleSocialLogin(googleProvider)}
            > <FontAwesomeIcon icon={faGoogle} />
                Continue with Google </Button>
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.social}
                onClick={() => handleSocialLogin(githubProvider)}
            >  <FontAwesomeIcon icon={faGithub} />
             Continue with Github </Button>
        </Box>
    )
}
