import express from 'express'
import { getProcedimientos } from '../controllers/Procedimiento.js';

const router = express.Router();

router.get("/:tratamiento", getProcedimientos)

export default router