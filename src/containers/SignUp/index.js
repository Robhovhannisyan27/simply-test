import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../../redux/user/use-user";

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
});

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addUser } = useUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [errorText, setErrorText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorText("");
    if (user.password !== user.password_confirm) {
      setErrorText("Password confirmation is wrong");
      return;
    }
    const result = addUser(user);
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
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          label="Email"
          className={classes.input}
        />
        <TextField
          required
          id="name-input"
          label="Full Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className={classes.input}
          type="text"
          autoComplete="name"
        />

        <TextField
          required
          id="standard-password-input"
          className={classes.input}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <TextField
          required
          id="standard-password-confirm-input"
          className={classes.input}
          value={user.password_confirm}
          onChange={(e) =>
            setUser({ ...user, password_confirm: e.target.value })
          }
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign up
        </Button>
        <p>
          Already have an acoount? Please <Link to="sign-in">Sign In</Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
