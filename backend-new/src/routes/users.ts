import express from 'express';
import UserController from "../controllers/users";

const router = express.Router();
const userController = new UserController()
//
router.post('/login', userController.login);

export default router;