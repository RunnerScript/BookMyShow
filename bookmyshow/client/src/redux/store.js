import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import theatreReducer from "./theatreSlice";
import showReducer from './showSlice';
import singleMovieReducer from './singleMovieSlice';
import bookReducer from './bookSlice';
const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer,
        movies: movieReducer,
        theatres: theatreReducer,
        shows: showReducer,
        singleMovie: singleMovieReducer,
        booking: bookReducer
    }
});

export default store;