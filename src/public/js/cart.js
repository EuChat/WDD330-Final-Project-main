import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let newItem = "";
  newItem = `<li class="cart-card divider">
    <div class="cart-card__image">
      <img src="${item.image}" alt="${item.title}" loading="lazy" >
    </div>

    <div>
      <h2 class="card__name">${item.title}</h2>
      <p>${item["Serving Suggestions"]}</p>
    </div>

    <button class="closer" value="${item.title}">&times;</button>
    </div>
  </li>`;

  return newItem;
}

renderCartContents();

// buttons for the cart items
const closers = document.querySelectorAll(".closer");
let total = document.querySelector("#Total");

// removing cart items
closers.forEach((element) => {
  element.addEventListener("click", () => {
    let theList = JSON.parse(localStorage.getItem("so-cart")) || [];
    let theItem = theList.findIndex((item) => item.Id == element.value);
    theList.splice(theItem, 1);
    setLocalStorage("so-cart", theList);
    window.location.reload();
  });
});

// total for the item
function findTotal() {
  let number = 0;
  let theList = JSON.parse(localStorage.getItem("so-cart")) || [];
  number = theList.length;
  return number;
}
total.textContent = `Number of recipes: ${findTotal()}`;
