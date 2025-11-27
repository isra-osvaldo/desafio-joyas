import { Router } from 'express'
import { getAllJoyasController, getJoyasFilterController } from '../src/controllers/joyasController.js'


const router = Router()

router.get('/joyas', getAllJoyasController)
router.get('/joyas/filtros', getJoyasFilterController)


export default router