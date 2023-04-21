import express from 'express'
import { getAsignaciones, searchAsignaciones } from '../controllers/Asignacion.js';

const router = express.Router();

router.get("/", getAsignaciones)
router.get("/:search", searchAsignaciones)

export default router