import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAlltheatre } from "../api/theatres";
import { fetchMovies } from "./movieSlice";

export const fetchTheatres = createAsyncThunk('fetch/theatre', async (theatre, { dispatch }) => {
    const response = await getAlltheatre();
    console.log(response.data);
    return response.data;
});


const theatreSlice = createSlice({
    name: "theatre",
    initialState: {
        list: [],
        selectedTheatre: null,
        formType: 'add',
        isModelOpen: false,
        isDeleteModelOpen: false,
        status: 'idle',
        error: null
    },
    reducers: {
        openModel: (state, action) => {
            state.isModelOpen = true;
            state.formType = action.payload.formType || null;
            state.selectedTheatre = action.payload.movie || null
        },
        closeModel: (state) => {
            state.isModelOpen = false;
            state.selectedTheatre = null;
        },
        openDeleteModel: (state, action) => {
            state.isDeleteModelOpen = true;
            state.selectedTheatre = action.payload;
        },
        closeDeleteModel: (state) => {
            state.isDeleteModelOpen = false;
            state.selectedTheatre = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTheatres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTheatres.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { openModel, openDeleteModel, closeModel, closeDeleteModel } = theatreSlice.actions;
export default theatreSlice.reducer;