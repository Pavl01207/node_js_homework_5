import dataFileManager from "../utils/DataFileManager.mjs"

class Product {
  static loadProductsList() {
    try {
      return dataFileManager.loadData()
    } catch (error) {
      throw new Error("Не вдалось заватажити список продуктів")
    }
  }
  static addNewProduct(productObj) {
    try {
      //додаємо новий продукт із унікальним id
      dataFileManager.addItem({ id: new Date().getTime(), ...productObj })
    } catch (error) {
      throw new Error("Операція з даними не пройшла!")
    }
  }
  static getProductById(id) {
    try {
      return dataFileManager.getItemById(id)
    } catch (error) {
      throw new Error("Операція з даними не пройшла!")
    }
  }
  static updateProduct(id, productData) {
    try {
      dataFileManager.updateItemById(id, productData)
    } catch (error) {
      throw new Error("Операція з даними не пройшла!")
    }
  }
  static deleteProductById(id) {
    try {
      dataFileManager.deleteItemById(id)
    } catch (error) {
      throw new Error("Операція з даними не пройшла!")
    }
  }
}

export default Product
