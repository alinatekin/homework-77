import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../store/messagesThunks';
import { apiUrl } from '../constants';
import type {AppDispatch, RootState} from "../app/store.ts";
import {useEffect} from "react";

const MessageList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: messages } = useSelector((state: RootState) => state.messages);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    return (
        <Grid container spacing={2} direction="column">
            {messages.map((msg) => (
                <Grid size={{ xs: 12 }} key={msg.id}>
                    <Card>
                        {msg.image && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${apiUrl}/${msg.image}`}
                                alt="Message attachment"
                                sx={{ objectFit: 'contain', bgcolor: '#f0f0f0' }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {msg.author} says:
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {msg.message}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MessageList;