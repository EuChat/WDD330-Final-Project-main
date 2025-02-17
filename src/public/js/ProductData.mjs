import { GetRecipes, getLocalStorage, setLocalStorage, availableList } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {

  }
  async getData() {
    let theOutput = getLocalStorage(availableList) || await GetRecipes();
    setLocalStorage(availableList, theOutput)
    return theOutput;
  }

  async findProductById(id) {
    let products = await this.getData();
    let result = products.find((item) => item.Id == id);
    return result;
  }
  async findProductByName(name) {
    const products = await this.getData();
    let theName = await name;
    let result = await products.find((item) => item.title == theName);
    return result;
  }
}
