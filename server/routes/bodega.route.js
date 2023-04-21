import express from 'express'
import { getBodega, newSuministro, searchBodega, updateSuministro } from '../controllers/Bodega.js'

const router = express.Router();

router.get("/:id", getBodega)
router.get("/:id/:search", searchBodega)
router.put("/update/:id_i/:id_s", updateSuministro)
router.post("/new/:institucion", newSuministro)

export default router