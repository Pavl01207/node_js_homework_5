import Product from "../models/Product.mjs"
import fs from "fs"

class ProductsController {
  static mainProducts(req, res) {
    const productsList = Product.loadProductsList()

    res.render("products/productsList", {
      products: productsList,
    })
  }

  static productDetail(req, res) {
    //отримаю id продукта із параметрів об'єкта req
    const id = req.params.id
    //за отриманим id отримую дані про відповідний продукт
    const product = Product.getProductById(id)
    //відредерити сторінку з інформацією про отриманий товар
    res.render("products/productDetail", {
      product,
    })
  }

  static createForm(req, res) {
    //відредерити сторінку з формою
    res.render("products/productForm", {
      product: null, //пуста форма
    })
  }

  static editForm(req, res) {
    //отримаю id продукта із параметрів об'єкта req
    const id = req.params.id
    //за отриманим id отримую дані про відповідний продукт
    const product = Product.getProductById(id)
    //відредерити сторінку з формою
    res.render("products/productForm", {
      product,
    })
  }

  static createProduct(req, res) {
    //отримаю дані про продукт який створює клієнт за допомогою req.body
    const productData = req.body
    //додається нова властивість в productData - imgSrc із шляхом до файлв
    productData.imgSrc = `/${req.file.filename}`
    Product.addNewProduct(productData)
    //після додавання продукта направляємо назад до сторінки із всіма продуктами
    res.redirect("/products")
  }

  static updateProduct(req, res) {
    const productData = req.body
    //якщо файл був завантажений тоді замінюємо шлях imgSrc на шляз до нового файла
    if (req.file) {
      productData.imgSrc = `/${req.file.filename}`
    }
    //вносимо зміни в дані про продукт
    Product.updateProduct(req.params.id, productData)
    res.redirect("/products")
  }

  static deleteProduct(req, res) {
    const id = req.body.id
    //за id знаходимо потрібний продукт
    const product = Product.getProductById(id)
    //якщо шлях до файлу існує в об'єкті файла і файл дійсно знаходиться на сервері(existsSync)
    if (product.imgSrc && fs.existsSync(product.imgSrc)) {
      //видалення файла unlinkSync()
      fs.unlinkSync(path.join(req.__dirname, `uploads\\${product.imgSrc}`))
    }
    Product.deleteProductById(req.body.id)
    res.send(200, { success: true })
    res.redirect("/products")
  }
}
export default ProductsController
