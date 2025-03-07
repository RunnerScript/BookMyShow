import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import theatreReducer from "./theatreSlice";
const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer,
        movies: movieReducer,
        theatres: theatreReducer
    }
});

export default store;