import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import type {Message, MessageMutation} from "../types";

export const fetchMessages = createAsyncThunk<Message[]>(
    'messages/fetchAll',
    async () => {
        const response = await axiosApi.get<Message[]>('/messages');
        return response.data;
    }
);

export const createMessage = createAsyncThunk<void, MessageMutation>(
    'messages/create',
    async (messageMutation) => {
        const formData = new FormData();

        formData.append('message', messageMutation.message);

        if (messageMutation.author) {
            formData.append('author', messageMutation.author);
        }

        if (messageMutation.image) {
            formData.append('image', messageMutation.image);
        }

        await axiosApi.post('/messages', formData);
    }
);