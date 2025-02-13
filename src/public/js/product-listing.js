import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

let targetList = document.querySelector(".product-list");
let Info = new ProductData();
let List = new ProductListing(Info, targetList);

List.init();

// <a href="/product_pages/index.html?product=${product.Name}">
