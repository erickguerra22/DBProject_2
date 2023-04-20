import express from 'express'
import { getAdicciones } from '../controllers/Adiccion.js';

const router = express.Router();

router.get("/:historial", getAdicciones)

export default router