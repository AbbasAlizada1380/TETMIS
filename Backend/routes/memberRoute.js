import express from 'express';
import { createMember, getAllMembers, getMemberById, updateMember, deleteMember, loginUser } from '../Controllers/memberController.js';

const memberRoute = express.Router();

memberRoute.post('/', createMember);
memberRoute.get('/', getAllMembers);
memberRoute.get('/:id', getMemberById);
memberRoute.put('/update/:id', updateMember);
memberRoute.delete('/:id', deleteMember);
memberRoute.post('/login', loginUser);


export default memberRoute;
