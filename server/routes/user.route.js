import express from 'express'
import { logIn, signUp, getUsers } from '../controllers/Usuario.js'

const router = express.Router();

router.post("/signUp", signUp)
router.post("/login", logIn)
router.get("/", getUsers)

export default router