import express from 'express'
import { logIn, signUp, updateUsuario, createUser, searchUser, assignInstitucion, getUsuarios } from '../controllers/Usuario.js'

const router = express.Router();

router.put("/update/:username", updateUsuario)
router.post("/signUp", signUp)
router.post("/new", createUser)
router.post("/login", logIn)
router.post("/institucion/:username", assignInstitucion)
router.get("/:search", searchUser)
router.get("/", getUsuarios)

export default router