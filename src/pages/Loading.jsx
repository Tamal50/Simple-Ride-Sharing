import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fabProgress: {
        textAlign: 'center',
    }
}));

export default function Loading() {
    const classes = useStyles();
    return (
        <Container mx="auto" className={classes.fabProgress}>
            <CircularProgress size={100} />
        </Container >
    )
}
