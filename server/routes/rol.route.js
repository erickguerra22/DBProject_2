import express from 'express'
import { createRole, getRoles } from '../controllers/Rol.js'

const router = express.Router();

router.get("/", getRoles)
router.post("/new", createRole)

export default router