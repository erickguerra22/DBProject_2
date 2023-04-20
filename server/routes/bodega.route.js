import express from 'express'
import { getBodega, searchBodega } from '../controllers/Bodega.js'

const router = express.Router();

router.get("/:id", getBodega)
router.get("/:id/:search", searchBodega)

export default router