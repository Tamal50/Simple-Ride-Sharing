

import { makeStyles } from '@material-ui/core/styles';

// MINE 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import rides from "../api/data.js";
import { Container, Grid, Box, Avatar } from '@material-ui/core';
import GoogleMap from '../components/GoogleMap.jsx';
import randomiseArray from '../utils/randomDataFromArray.js';



const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    }
}));

export default function SearchResult() {
    const classes = useStyles();
    const { from, destination } = useParams();
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
       
        const randomData = randomiseArray(rides);
        console.log({ randomData });
        setSearchResult(randomData);
    }, [])

    const getResults = () => (
        <>
            <Box color="orange" varient="contained">
                <h2> {from} </h2>
                <h2>{destination}</h2>
            </Box>
            <Box color="orange" varient="contained">
                {
                    searchResult.map(({ id, title, image }) => <Box key={id} m={4} style={{ display: "flex" }}> <Avatar src={`${image}`} /> {title} </Box>)
                }
            </Box>
        </>
    )
    return (
        <Container >
            <Grid container className={classes.root}>
                <Grid item md={4} p={3}>
                    {getResults()}
                </Grid>
                <Grid item md={8}>
                    <GoogleMap />
                </Grid>
            </Grid>
        </Container>
    );
}
