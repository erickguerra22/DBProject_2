import express from 'express'
import { getAdicciones } from '../controllers/Adiccion.js';

const router = express.Router();

router.get("/", getAdicciones)

export default router