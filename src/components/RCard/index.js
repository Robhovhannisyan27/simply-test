import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "20 0",
  },
  media: {
    height: 140,
  },
  description: {
    minHeight: 40,
  },
});

export default function RCard({ restaurant }) {
  const classes = useStyles();
  const rateAvg =
    restaurant.comments.reduce(function (avg, value) {
      return avg + value.rating;
    }, 0) / restaurant.comments.length;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={restaurant.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {restaurant.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            {restaurant.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating {rateAvg.toFixed(2)}
        </Typography>
        <Link to={`/restaurant/${restaurant.id}`}>Learn More</Link>
      </CardActions>
    </Card>
  );
}
