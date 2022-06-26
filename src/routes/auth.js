import express from 'express';
import * as authControllers from "../controllers/auth.js";

export const router = express.Router();

router.post('/registration', authControllers.registration)