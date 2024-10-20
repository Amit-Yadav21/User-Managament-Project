import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser, logout } from '../controllers/userController.js';
import {verifyToken} from '../auth/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/all', getAllUsers);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/logout/:id', verifyToken, logout);

export default router;