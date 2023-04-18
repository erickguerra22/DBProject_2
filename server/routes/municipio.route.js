import express from 'express'
import { getMunicipios } from '../controllers/Municipio.js'

const router = express.Router();

router.get("/:departamento", getMunicipios)

export default router