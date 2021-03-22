import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// MINE 
import CardRider from '../components/CardRider';
import data from '../api/data.js';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    flexWrap: "wrap"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [rides, setRides] = useState([])

  useEffect(() => {
    setRides(data);
  }, [])

  function Rides() {
    return (
      <React.Fragment>
        {
          rides.map(ride => (
            <Grid item sm={12} md={3} key={ride.id}>
              <CardRider ride={ride} />
            </Grid>
          ))
        }
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Container >
        <Grid container item xs={12} spacing={1} m={5} >
          <Rides />
        </Grid>
      </Container>
    </div>
  );
}
