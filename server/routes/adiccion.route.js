import express from 'express'
import { getAdicciones, getAdiccionesOnHistory } from '../controllers/Adiccion.js';

const router = express.Router();

router.get("/:id", getAdiccionesOnHistory)
router.get("/",getAdicciones)

export default router