import React, { useState, useEffect } from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useRestaurant } from "../../redux/restaurant/use-restaurant";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import DateFnsUtils from "@date-io/date-fns";
import {
  Divider,
  Grid,
  Paper,
  Container,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  button: {
    marginTop: 20,
  },
  input: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
  },
  homeContainer: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    textAlign: "left",
  },
  image: {
    maxWidth: 600,
  },
  avatar: {
    width: 50,
    background: "red",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 29,
    borderRadius: 50,
  },
  commentAuthor: { margin: 0, textAlign: "left" },
  textarea: {
    width: "100%",
    margin: "30px 0",
  },
  reviewContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 50,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
  },
});

const Restaurant = (props) => {
  const date = new Date();
  const styles = useStyles();
  const [errorText, setErrorText] = useState("");
  const [review, setReview] = useState({
    text: "",
    author: "",
    rating: 0,
    visit_date: `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`,
  });
  const [restaurant, setRestaurant] = useState({});
  let { id } = useParams();
  const { showRestaurant, handleReview } = useRestaurant();
  useEffect(() => {
    const data = showRestaurant(id);
    if (data.success) {
      setRestaurant(data.restaurant);
    }
  }, []);
  const handleClick = () => {
    review.author = JSON.parse(localStorage.getItem("authUser")).name;
    const result = handleReview(id, review);
    if (result.success) {
      props.history.push("/");
    } else {
      setErrorText("Something went wrong!");
    }
  };
  if (!Object.keys(restaurant).length) {
    return <div>Something went wrong</div>;
  }
  return (
    <Container maxWidth="lg">
      <div className={styles.errorText}>{errorText}</div>
      <div>
        <img src={restaurant.image} className={styles.image} />
        <h2>{restaurant.name}</h2>
        <p>{restaurant.description}</p>
      </div>
      <div className={styles.commentContainer}>
        <p>Comments:</p>
        <Paper style={{ padding: "40px 20px" }}>
          {restaurant.comments.map((comment, index) => {
            return (
              <div key={index}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <div className={styles.avatar}>
                      {comment.author.charAt(0)}
                    </div>
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <h4 className={styles.commentAuthor}>{comment.author}</h4>
                    <p style={{ textAlign: "left" }}>{comment.text}</p>
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              </div>
            );
          })}
        </Paper>
        <form>
          <textarea
            className={styles.textarea}
            value={review.text}
            onChange={(e) => setReview({ ...review, text: e.target.value })}
            placeholder="Comment"
          />
          <div className={styles.reviewContainer}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={review.rating}
                onChange={(event, newValue) => {
                  setReview({ ...review, rating: newValue });
                }}
              />
            </Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                maxDate={new Date()}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Visit date"
                value={review.visit_date}
                onChange={(date) =>
                  setReview({
                    ...review,
                    visit_date: `${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDate()}`,
                  })
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <Button onClick={handleClick} variant="contained" color="primary">
              Send
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Restaurant;
