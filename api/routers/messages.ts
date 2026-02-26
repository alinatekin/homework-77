import express from 'express';
import { imagesUpload } from '../multer';
import fileDb from '../fileDb';
import { MessageMutation } from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message || req.body.message.trim() === '') {
        res.status(400).send({ error: 'Message is required' });
        return;
    }

    const messageData: MessageMutation = {
        author: req.body.author ? req.body.author.trim() : '',
        message: req.body.message.trim(),
        image: req.file ? req.file.filename : null,
    };

    const savedMessage = await fileDb.addMessage(messageData);
    res.send(savedMessage);
});

export default messagesRouter;