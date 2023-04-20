import express from 'express'
import { getDepartamentos } from '../controllers/Departamento.js'

const router = express.Router();

router.get("/", getDepartamentos)

export default router