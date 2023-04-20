import express from 'express'
import { getMedicamentos } from '../controllers/Medicamento.js';

const router = express.Router();

router.get("/:tratamiento", getMedicamentos)

export default router