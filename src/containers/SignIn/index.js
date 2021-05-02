import React, { useState } from "react";
import "./index.css";
import { Link, useHistory } from "react-router-dom";
import { Button, Input, TextField } from "@material-ui/core";
import { useUser } from "../../redux/user/use-user";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  errorText: {
    color: "red",
  },
});

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");
  const { loginUser } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("loggedIn", "true");
    const result = loginUser(user);
    if (result.success) {
      history.push("/");
    } else {
      setErrorText("Something went wrong!");
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.errorText}>{errorText}</div>
      <div className="form-container">
        <TextField
          required
          id="standard-required"
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" color="primary">
          Sign in
        </Button>
        <p>
          New to us? <Link to="sign-up">Sign Up</Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
