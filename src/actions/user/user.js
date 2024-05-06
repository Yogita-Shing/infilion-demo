import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../utils/config";

export const getUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const {data} = await axios.get(`${server}`);
    dispatch({ type: "GET_USERS_SUCCESS",payload:data?.data });
    localStorage.setItem(
      "users",
      JSON.stringify(data.data)
    );
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(message);
    dispatch({ type: "GET_USERS_FAIL", payload: message });
  }
};


export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: "DELETE_USER_REQUEST", payload: id });
  try {
    dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
    localStorage.setItem(
      "users",
      JSON.stringify(getState()?.userReducer?.users)
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(message);
    dispatch({ type: "DELETE_USER_FAIL", payload: message });
  }
};

export const updateUser = (data) => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_USER_REQUEST", payload: data });
  try {
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: data });
    localStorage.setItem(
      "users",
      JSON.stringify(getState()?.userReducer?.users)
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    toast.error(message);
    dispatch({ type: "UPDATE_USER_FAIL", payload: message });
  }
};
