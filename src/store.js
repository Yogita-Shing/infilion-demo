// import {createStore,applyMiddleWare,combineReducers,compose} from "react-redux"
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/user/user";

const reducer = combineReducers({
    userReducer: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
