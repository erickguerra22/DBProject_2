import express from 'express'
import { getRegistros } from '../controllers/Bitacora.js'

const router = express.Router();

router.get("/", getRegistros)

export default router