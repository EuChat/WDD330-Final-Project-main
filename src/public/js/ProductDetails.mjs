import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  let output = "";
  // ingredients
  let ingredients = document.createElement("ul");
  product.extendedIngredients.forEach(ingredient => {
    let item = document.createElement("li");
    item.textContent = ingredient.originalName;
    ingredients.appendChild(item);
  })

  // nutrition
  let nutrition = document.createElement("ul");
  product.diets.forEach(diet => {
    let item = document.createElement("li");
    item.textContent = diet;
    nutrition.appendChild(item);
  })

  //instructions
  let instructions = document.createElement("ol");
  product.analyzedInstructions[0].steps.forEach(instrcution => {
    let item = document.createElement("li");
    item.textContent = instrcution.step;
    instructions.appendChild(item);
  })

  output = `<section class="product-detail"> <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}" loading="lazy" >
    <h3 class="divider">Ingredients</h3>
    <ul>
      ${ingredients.innerHTML}
    </ul>
    <h3 class="divider">Nutrition</h3>
    <ul>
      ${nutrition.innerHTML}
    </ul>
    <h3 class="divider">Instructions</h3>
    <ol>
      ${instructions.innerHTML}
    </ol>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.id}">Add to Cart</button>
    </div></section>`;


  return output;

}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    // this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductByName(this.productId);
    // once we have the product details we can render out the HTML
    // this.renderProductDetails("main");
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    try {
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      window.console.log(error);

    }
  }
  addToCart() {
    // Retrieve the existing cart from local storage
    let currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];

    currentCart.push(this.product);

    setLocalStorage("so-cart", currentCart);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.innerHTML = productDetailsTemplate(this.product)
    return element;
  }
}
