import express from 'express'
import { getEnfermedades } from '../controllers/Enfermedad.js';

const router = express.Router();

router.get("/:historial", getEnfermedades)

export default router