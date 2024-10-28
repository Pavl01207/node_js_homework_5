import ProductsController from '../controllers/productsController.mjs'
import UploadManager from '../utils/UploadManager.mjs'

import { Router } from 'express'
const router = Router()

router.get('/', ProductsController.mainProducts)

router.get('/create', ProductsController.createForm)
router.get('/edit/:id', ProductsController.editForm)

router.get('/:id', ProductsController.productDetail)

router.post(
  '/:id',
  UploadManager.getUploadStorage().single('prodImg'),
  ProductsController.updateProduct
)

router.post(
  '/',
  UploadManager.getUploadStorage().single('prodImg'),
  ProductsController.createProduct
)

router.delete('/', ProductsController.deleteProduct)

export default router
