import express from 'express'
import { createInstitution, getInstituciones, updateInstitucion } from '../controllers/Institucion.js';

const router = express.Router();

router.post("/new", createInstitution)
router.put("/update/:institucion", updateInstitucion)
router.get("/", getInstituciones)

export default router