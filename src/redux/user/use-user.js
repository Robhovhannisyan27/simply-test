import { useDispatch, useSelector } from "react-redux";
import { authUser, getUsers } from "./selector";
import { registerNewUser, loginUserRequest, logoutUser } from "./actions";

export const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const currentUser = useSelector(authUser);

  function addUser(newUser) {
    let duplicateUser = users.filter((user) => {
      return user.email === newUser.email;
    }).length;
    if (duplicateUser) {
      return {
        success: false,
        message: 'Email "' + newUser.email + '" is already taken',
      };
    }

    // save new user
    newUser.id = users.length
      ? Math.max(...users.map((user) => user.id)) + 1
      : 1;
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    dispatch(registerNewUser(newUser));
    dispatch(loginUserRequest(newUser));
    return {
      success: true,
      user: newUser,
    };
  }

  function loginUser(user) {
    const isUserExists = users.find(
      (item) => user.email == item.email && user.password == item.password
    );
    if (!isUserExists) {
      return {
        success: false,
        message: "Email or password is invalid",
      };
    }
    localStorage.setItem("authUser", JSON.stringify(isUserExists));
    dispatch(loginUserRequest(isUserExists));
    return {
      success: true,
      user: user,
    };
  }

  function logoutUser() {
    localStorage.removeItem("authUser");
    dispatch(logoutUser());
    return {
      success: true,
    };
  }

  return {
    users,
    addUser,
    logoutUser,
    loginUser,
  };
};
