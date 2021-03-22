
// MINE 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import data from "../api/data.js";
import { Container, Grid, Box, Typography } from '@material-ui/core';


export default function RideSingle() {

    const { rideId } = useParams();
    // const history = useHistory();
    const [ride, setRide] = useState({});


    useEffect(() => {
        const foundRider = data.find((rd) => parseInt(rideId) === rd.id);
        setRide(foundRider);
    }, [rideId])


    return (
        <Container >
            <Grid container >
                <Grid item md={3}>
                    <Box p={4}>
                        <img src={ride?.image} alt={ride?.title} style={{ width: "90%" }} />
                    </Box>
                </Grid>
                <Grid item md={8} container>

                    <Typography component="h2" varient="h3" color="secondary"> {ride?.title} </Typography>

                </Grid>
            </Grid>
        </Container>
    );
}
