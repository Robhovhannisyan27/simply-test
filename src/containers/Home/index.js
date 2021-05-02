import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import RCard from "../../components/RCard";
import { useUser } from "../../redux/user/use-user";
import data from "../../data.json";
import { useRestaurant } from "../../redux/restaurant/use-restaurant";

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
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0 auto",
    flexWrap: "wrap",
    height: "100vh",
  },
  logout: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

const Home = (props) => {
  const styles = useStyles();
  const { logoutUser } = useUser();
  const { handleSetRestaurants, restaurants } = useRestaurant();

  useEffect(() => {
    if (localStorage.getItem("restaurants")) {
      const existingData = JSON.parse(localStorage.getItem("restaurants"));
      if (!existingData.length) {
        localStorage.setItem("restaurants", JSON.stringify(data.restaurants));
      }
    } else {
      localStorage.setItem("restaurants", JSON.stringify(data.restaurants));
    }
    handleSetRestaurants(JSON.parse(localStorage.getItem("restaurants")));
  }, []);

  const handleLogout = () => {
    const result = logoutUser();
    if (result.success) {
      props.history.push("/sign-in");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Button
        className={styles.logout}
        variant="contained"
        onClick={handleLogout}
      >
        Logout
      </Button>
      {restaurants.map((restaurant) => {
        return <RCard restaurant={restaurant} key={restaurant.id} />;
      })}
    </div>
  );
};

export default Home;
