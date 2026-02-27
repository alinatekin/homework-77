import { createSlice } from '@reduxjs/toolkit';
import { createMessage, fetchMessages } from './messagesThunks';
import type {Message} from "../types";

interface MessagesState {
    items: Message[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: MessagesState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, { payload }) => {
                state.fetchLoading = false;
                state.items = payload;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.fetchLoading = false;
            });

        builder
            .addCase(createMessage.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createMessage.rejected, (state) => {
                state.createLoading = false;
            });
    },
});

export const messagesReducer = messagesSlice.reducer;