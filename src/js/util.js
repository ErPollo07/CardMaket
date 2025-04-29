import { readFileSync } from 'fs'; 

class Util {
  static getProductList() {
    let productsString = readFileSync("../data/products.json", "utf8");

    return JSON.parse(productsString);
  }
}

export default Util;
