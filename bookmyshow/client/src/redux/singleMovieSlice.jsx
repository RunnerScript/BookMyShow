import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createMovie, getAllMovies, getMovieById, updateMovieById } from "../api/movies";
import { getAllShowsByMovie } from "../api/shows";
import { useMovies } from "../hooks/useMovies";
import movieSlice from "./movieSlice";

//Get single Movie 
export const getMovieWithId = createAsyncThunk('fetch/movie', async (movieId) => {
    const response = await getMovieById(movieId);
    return response.data;
});

export const getShowsOfMovie = createAsyncThunk('fetch/movieshows', async (payload) => {
    const response = await getAllShowsByMovie(payload.id, payload.date);
    return response.data;
});

const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState: {
        movie: null,
        status: "idle",
        shows: [],
        showStatus: "idle",
        showError: null,
        date: null,
        error: null,
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        }
    },
    extraReducers: (builder) => {
        //Fetch Movies Cases
        builder
            .addCase(getMovieWithId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getMovieWithId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movie = action.payload;
                console.log("Are you running", state.shows);
            })
            .addCase(getMovieWithId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        builder
            .addCase(getShowsOfMovie.pending, (state) => {
                state.showStatus = 'loading'
            })
            .addCase(getShowsOfMovie.fulfilled, (state, action) => {
                state.showStatus = 'succeeded';
                state.shows = action.payload;

            })
            .addCase(getShowsOfMovie.rejected, (state, action) => {
                state.showStatus = 'failed';
                state.showError = action.error.message;
            });

    }
});

export const { setDate } = singleMovieSlice.actions;
export default singleMovieSlice.reducer;
