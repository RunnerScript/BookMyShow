import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createMovie, getAllMovies, updateMovieById } from "../api/movies";
import { useMovies } from "../hooks/useMovies";

//Fetch Movies Call
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await getAllMovies();
    return response.data;
});

// Add Movie Api Call
export const addMovie = createAsyncThunk('movies/add', async (newMovie, { dispatch }) => {
    const response = await createMovie(newMovie);
    dispatch(fetchMovies());
    return response.data;
});

//Update Movie 
export const updateMovie = createAsyncThunk('movies/update', async (movie, { dispatch }) => {
    const response = await updateMovieById(movie.id, movie.payload);
    dispatch(fetchMovies());
    return response.data;
});

//Delete Movie
export const deleteMovie = createAsyncThunk('delete/movie', async (movieId, { dispatch }) => {
    const response = await deleteMovie(movieId);
    dispatch(fetchMovies());
    return response.data;
})

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        selectedMovie: null,
        isModalOpen: false,
        isDeleteModalOpen: false,
        formType: 'add',
        status: "idle",
        error: null
    },
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedMovie = action.payload.movie || null;
            state.formType = action.payload.formType || null;
        },
        dateFormat: (state, action) => {
            if (state.selectedMovie) {
                //console.log("Selected Movie", state.selectedMovie.releaseDate, action);
                state.selectedMovie.releaseDate = action.payload
            }
        },
        closeModal: (state, action) => {
            state.isModalOpen = false;
            state.selectedMovie = null;
        },
        openDeleteModal: (state, action) => {
            state.isDeleteModalOpen = true;
            state.selectedMovie = action.payload;
        },
        closeDeleteModal: (state, action) => {
            state.isDeleteModalOpen = false;
            state.selectedMovie = null;
        }
    },
    extraReducers: (builder) => {
        //Fetch Movies Cases
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // //Add Movie Cases
        // builder
        //     .addCase(addMovie.pending, (state) => {
        //         state.status = "loading";
        //     })
        //     .addCase(addMovie.fulfilled, (state, action) => {
        //         state.status = "succeeded";
        //     })
        //     .addCase(addMovie.rejected, (state, action) => {
        //         state.status = 'failed';
        //         state.error = action.error.message;
        //     });

        // //Update Movie
        // builder
        //     .addCase(updateMovie.pending, (state) => {
        //         state.status = "loading";
        //     })
        //     .addCase(updateMovie.fulfilled, (state, action) => {
        //         state.status = "succeeded";
        //     })
        //     .addCase(updateMovie.rejected, (state, action) => {
        //         state.status = 'failed';
        //     });

        // //delete Movie
        // builder
        //     .addCase(deleteMovie.pending, (state) => {
        //         state.status = "loading";
        //     })
        //     .addCase(deleteMovie.fulfilled, (state, action) => {
        //         state.status = "succeeded";
        //     })
        //     .addCase(deleteMovie.rejected, (state, action) => {
        //         state.status = 'failed';
        //     });

    }
});

export const { openModal, dateFormat, closeModal, openDeleteModal, closeDeleteModal } = movieSlice.actions;
export default movieSlice.reducer;
