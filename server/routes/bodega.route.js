import express from 'express'
import { getBodega } from '../controllers/Bodega.js'

const router = express.Router();

router.get("/:id", getBodega)

export default router