import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllShowsByTheatreId, createShow, updateShow } from "../api/shows";

export const fetchShowsByTheatre = createAsyncThunk('fetch/theatreshows', async (theatreId, { dispatch }) => {
    const response = await getAllShowsByTheatreId(theatreId);
    console.log("MYdata", response.data);
    return response.data;
});

export const addShow = createAsyncThunk('shows/create', async (payload, { dispatch }) => {
    const response = await createShow(payload);
    dispatch(fetchShowsByTheatre(payload.theatre));
    return response.data;
});

export const modifyShow = createAsyncThunk('shows/update', async (payload, { dispatch }) => {
    const response = await updateShow(payload.showId, payload.show);
    dispatch(fetchShowsByTheatre(payload.theatre));
    return response.data;
});


const showSlice = createSlice({
    name: "shows",
    initialState: {
        list: [],
        isModalOpen: false,
        isDeleteModalOpen: false,
        selectedShow: null,
        formType: "idle",
        error: null,
        status: "idle"
    },
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedShow = action.payload.show || null;
            state.formType = action.payload.formType;
        },
        dateFormat: (state, action) => {
            if (state.selectedShow) {
                state.selectedShow.date = action.payload
            }
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedShow = null;
        },
        openDeleteModal: (state, action) => {
            state.isDeleteModalOpen = true;
            state.selectedShow = action.payload.show || null;
            state.formType = action.payload.formType;
        },
        closeDeleteModal: (state, action) => {
            state.isDeleteModalOpen = false;
            state.selectedShow = null;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowsByTheatre.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShowsByTheatre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchShowsByTheatre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { openModal, closeModal, openDeleteModal, closeDeleteModal } = showSlice.actions;
export default showSlice.reducer;