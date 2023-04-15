import express from 'express'
import { getExpedientes } from '../controllers/Expediente.js';

const router = express.Router();

router.get("/", getExpedientes)

export default router