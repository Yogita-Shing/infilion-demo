const initialState = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [],
  loading: true,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS": {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    }
    case "GET_USERS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_USER_SUCCESS": {
      const temp = state.users.filter((e) => e.id != action.payload);
      return {
        ...state,
        loading: false,
        users: temp,
      };
    }

    case "DELETE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_USER_SUCCESS": {
      let test = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        loading: false,
        users: test,
      };
    }

    case "UPDATE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
