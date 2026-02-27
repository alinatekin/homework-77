import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import FileInput from './FileInput';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchMessages } from '../store/messagesThunks';
import type {AppDispatch, RootState} from "../app/store.ts";
import type {MessageMutation} from "../types";

const MessageForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { createLoading } = useSelector((state: RootState) => state.messages);

    const [state, setState] = useState<MessageMutation>({
        author: '',
        message: '',
        image: null,
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.message.trim()) return;

        await dispatch(createMessage(state));
        setState({ author: '', message: '', image: null });
        await dispatch(fetchMessages());
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <Box
            component="form"
            onSubmit={submitFormHandler}
            sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        label="Author"
                        name="author"
                        value={state.author}
                        onChange={inputChangeHandler}
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        required
                        multiline
                        rows={3}
                        label="Message"
                        name="message"
                        value={state.message}
                        onChange={inputChangeHandler}
                        fullWidth
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileInputChangeHandler}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={createLoading}
                    >
                        {createLoading ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MessageForm;