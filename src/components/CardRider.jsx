import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "5rem auto"
    // maxWidth: 345,
  },
  media: {
    height: 140,
    width: "100%",
    margin: "0px auto"
  },
  center: {
    textAlign: "center"
  },
});

export default function CardRider({ ride }) {
  const classes = useStyles();


  const { id, title, image } = ride;
  const history = useHistory();

  const handleSelect = id => {
    history.push(`/destination/${id}`)
  }
  return (
    <Card className={classes.root}
      onClick={() => handleSelect(id)}
    >
      <CardActionArea>
        <Box className={classes.center}>
          <img src={`${image}`} alt={title} className={classes.media} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
