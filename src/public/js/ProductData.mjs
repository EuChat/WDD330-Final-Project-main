window.console.log(import.meta);
let baseURL;

try {
  baseURL = import.meta.env.VITE_SERVER_URL
} catch (error) {
  baseURL = `/json/recipes-temporary.json`
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // this.path = `/json/recipes-temporary.json`;
  }
  // async getData() {
  //   let result = await fetch(this.path)
  //     .then(convertToJson)
  //     .then((data) => data);
  //   return result;
  // }
  async getData() {
    let result = await fetch(baseURL)
      .then(convertToJson)
      .then((data) => data);
    return result;
  }
  async findProductById(id) {
    let products = await this.getData();
    let result = products.find((item) => item.Id == id);
    return result;
  }
  async findProductByName(name) {
    const products = await this.getData();
    let theName = await name;
    let result = await products.find((item) => item.Name == theName);
    return result;
  }
}
