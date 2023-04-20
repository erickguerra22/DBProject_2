import express from 'express'
import { getHistorial, searchHistorial } from '../controllers/Historial.js'

const router = express.Router();

router.get("/:dpi", getHistorial)
router.get("/:dpi/:search", searchHistorial)

export default router