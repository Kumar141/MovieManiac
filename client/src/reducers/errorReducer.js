import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; //(Putting error in our redux state) Here it'll return error which comes from authActions.js (line 13) through GET_ERRORS action type.
    default:
      return state;
  }
}
