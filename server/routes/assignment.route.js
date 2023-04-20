import express from 'express'
import { getAsignaciones } from '../controllers/Asignacion.js';

const router = express.Router();

router.get("/", getAsignaciones)

export default router