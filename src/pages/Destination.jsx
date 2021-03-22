import { makeStyles } from '@material-ui/core/styles';

// MINE 
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import data from "../api/data.js";
import { Container, Grid, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext.jsx';
import GoogleMap from '../components/GoogleMap.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputFeild: {
        width: "95%",
        margin: "5px",
    }
}));

export default function Destination() {
    const { register, handleSubmit, errors } = useForm();

    const classes = useStyles();
    const { rideId } = useParams();
    const history = useHistory();
    const [ride, setRide] = useState({});
    const { goal, setGoal } = useAuth();

    useEffect(() => {
        const foundRider = data.find((rd) => parseInt(rideId) === rd.id);
        setRide(foundRider);
    }, [rideId])

    const handleSearch = data => {
        const { from, destination } = data;
        setGoal(data);
        console.log({ ride, goal });
        history.push(`/search-results/${from}/${destination}`)
    }
    const getForm = () => (
        <form className={classes.form} p={3} onSubmit={handleSubmit(handleSearch)}>
            <input
                type="text"
                name="from"
                placeholder="From"
                ref={register({ required: true })}
                className={classes.inputFeild} />
            {errors.from?.type && (<p style={{ color: "red" }}> From is required</p>)}

            <input
                type="text"
                name="destination"
                placeholder="Destination"
                ref={register({ required: true })}
                className={classes.inputFeild} />
            {errors.destination?.type === "required" && (<p style={{ color: "red" }}> Destination is required </p>)}
            {errors.destination?.type === "minLength" && (<p style={{ color: "red" }}> Destination must be at least 6 character </p>)}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >  SEARCH
          </Button>

        </form>
    )
    return (
        <Container >
            <Grid container>
                <Grid item md={4} p={3}>
                    {getForm()}
                </Grid>
                <Grid item md={8}>
                    <GoogleMap />
                </Grid>
            </Grid>
        </Container>
    );
}
