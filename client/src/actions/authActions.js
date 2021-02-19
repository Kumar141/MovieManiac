import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

//created an action type of GET_ERRORS.
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User //Dispatching it to reducer
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData) //Posts userData from the mentioned route.
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        //Middleware thunk
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      //Save to local Storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data (token contains all of the information a user have in the db)
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
