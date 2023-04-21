import express from 'express'
import { getEnfermedades, getEnfermedadesOnHistory } from '../controllers/Enfermedad.js';

const router = express.Router();

router.get("/:id", getEnfermedadesOnHistory)
router.get("/", getEnfermedades)

export default router