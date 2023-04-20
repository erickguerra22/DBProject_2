import express from 'express'
import { getEspecialidades } from '../controllers/Especialidad.js'

const router = express.Router();

router.get("/", getEspecialidades)

export default router