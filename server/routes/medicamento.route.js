import express from 'express'
import { getAlertas, getMedicamentos } from '../controllers/Medicamento.js';

const router = express.Router();

router.get("/:tratamiento", getMedicamentos)
router.get("/alertas/:institucion", getAlertas)

export default router