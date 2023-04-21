import express from 'express'
import { getSuministros } from '../controllers/Suministro.js';

const router = express.Router();

router.get("/", getSuministros)

export default router