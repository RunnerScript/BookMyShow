import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import theatreReducer from "./theatreSlice";
import showReducer from './showSlice';
const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer,
        movies: movieReducer,
        theatres: theatreReducer,
        shows: showReducer
    }
});

export default store;