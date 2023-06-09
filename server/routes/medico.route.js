import express from 'express'
import { getMedico, getMedicos, newMedico, updateMedico } from '../controllers/Medico.js'

const router = express.Router();

router.post("/new", newMedico)
router.put("/update/:no_colegiado", updateMedico)
router.get("/", getMedicos)
router.get("/:username", getMedico)

export default router