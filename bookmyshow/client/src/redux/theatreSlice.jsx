import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTheatre, getAlltheatre, updateTheatreById, deleteTheatreById } from "../api/theatres";


export const fetchTheatres = createAsyncThunk('fetch/theatre', async (theatre, { dispatch }) => {
    const response = await getAlltheatre();
    return response.data;
});

export const updateTheatre = createAsyncThunk('update/theatre', async (theatre, { dispatch }) => {
    const response = await updateTheatreById(theatre.id, theatre.payload);
    dispatch(fetchTheatres());
    return response.data;
});

export const addTheatre = createAsyncThunk('add/theatre', async (theatre, { dispatch }) => {
    const response = await createTheatre(theatre);
    dispatch(fetchTheatres());
    return response.data;
});

export const deleteTheatre = createAsyncThunk('delete/theatre', async (theatreId, { dispatch }) => {
    const response = await deleteTheatreById(theatreId);
    dispatch(fetchTheatres());
    return response.data;
});


const theatreSlice = createSlice({
    name: "theatre",
    initialState: {
        list: [],
        selectedTheatre: null,
        formType: 'add',
        isModalOpen: false,
        isDeleteModalOpen: false,
        status: 'idle',
        error: null
    },
    reducers: {
        openModal: (state, action) => {
            console.log(action.payload);
            state.isModalOpen = true;
            state.formType = action.payload.formType || null;
            state.selectedTheatre = action.payload.theatre || null
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedTheatre = null;
        },
        openDeleteModal: (state, action) => {
            state.isDeleteModalOpen = true;
            state.formType = action.payload.formType;
            state.selectedTheatre = action.payload.theatre;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
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
            .addCase(fetchTheatres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { openModal, openDeleteModal, closeModal, closeDeleteModal } = theatreSlice.actions;
export default theatreSlice.reducer;