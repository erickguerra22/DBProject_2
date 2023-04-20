import express from 'express'
import { getTratamientos } from '../controllers/Tratamiento.js'

const router = express.Router();

router.get("/:historial", getTratamientos)

export default router