import express from 'express';
import { fetchVerifiedMessages, sendMessage, verifyEmail } from '../Controllers/messageController.js';

const massageRouter = express.Router();

massageRouter.post('/', sendMessage);
massageRouter.post('/verify/', verifyEmail);
massageRouter.get('/verified-messages', fetchVerifiedMessages);

export default massageRouter;
