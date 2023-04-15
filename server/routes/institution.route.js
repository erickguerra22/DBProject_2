import express from 'express'
import { getInstitutions } from '../controllers/Institucion.js';

const router = express.Router();

router.get("/", getInstitutions)

export default router