import MainController from '../controllers/mainController.mjs'
import { Router } from 'express'
const router = Router()

//---- обробка шляху '/'
router.get('/', MainController.info)

export default router
