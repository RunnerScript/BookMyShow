import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShowById } from "../api/shows";
import { getUserBookings } from "../api/booking";

export const fetchShowById = createAsyncThunk('fetchShow/singleShow', async (showId) => {
    const response = await getShowById(showId);
    return response.data;
});

export const fetchUserBookings = createAsyncThunk("fetch/userBookings", async (userId) => {
    const response = await getUserBookings(userId);
    return response.data;
});


const bookSlice = createSlice({
    name: 'booking',
    initialState: {
        selectedShow: null,
        status: 'idle',
        bookingStatus: 'idle',
        bookingError: null,
        error: null,
        selectedSeats: [],
        userBookings: [],
    },
    reducers: {
        addSeat: (state, action) => {
            state.selectedSeats.push(action.payload);
        },
        removeSeat: (state, action) => {
            state.selectedSeats = state.selectedSeats.filter(seat => seat !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchShowById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedShow = action.payload;
            })
            .addCase(fetchShowById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(fetchUserBookings.pending, (state) => {
                state.bookingStatus = 'loading';
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.bookingStatus = 'succeeded';
                state.userBookings = action.payload;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.bookingStatus = 'failed';
                state.bookingError = action.payload;
            });
    }
});

export const { addSeat, removeSeat } = bookSlice.actions;
export default bookSlice.reducer;