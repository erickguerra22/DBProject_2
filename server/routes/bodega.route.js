import express from 'express'
import { getBodega, searchBodega, updateSuministro } from '../controllers/Bodega.js'

const router = express.Router();

router.get("/:id", getBodega)
router.get("/:id/:search", searchBodega)
router.put("/update/:id_i/:id_s", updateSuministro)

export default router