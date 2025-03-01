import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMovies } from "../api/movies";

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await getAllMovies();
    return response.data;
});

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
    }
});

export const { openModal, closeModal, openDeleteModal, closeDeleteModal } = movieSlice.actions;
export default movieSlice.reducer;
