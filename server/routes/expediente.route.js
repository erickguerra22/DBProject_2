import express from 'express'
import { getExpedientes, newExpediente, removeExpediente, searchExpediente, updateExpediente } from '../controllers/Expediente.js';

const router = express.Router();

router.post("/new", newExpediente)
router.put("/update/:dpi", updateExpediente)
router.delete("/delete/:dpi", removeExpediente)
router.get("/:search", searchExpediente)
router.get("/", getExpedientes)

export default router