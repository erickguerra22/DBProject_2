import express from 'express'
import { getRegistros, searchRegistros } from '../controllers/Bitacora.js'

const router = express.Router();

router.get("/", getRegistros)
router.get("/:search", searchRegistros)

export default router