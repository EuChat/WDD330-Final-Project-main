let searchbutton = document.querySelector("#find");
let searchRes = document.querySelector("#result");

searchbutton.oninput = function () {
  GetResult();
};

async function GetResult() {
  let data = await fetch("/json/recipes-temporary.json");
  let res = await data.json();
  res = res.filter((item) =>
    item.Name.toLowerCase().includes(searchbutton.value.toLowerCase()),
  );

  let theList = res.map((item) => productCardTemplate(item));
  searchRes.innerHTML = theList.join("");
}

function productCardTemplate(product) {
  let card = "";
  card = `<li class="product-card">
        <a href="/directories/recipe-details.html?product=${product.Name}">
          <h2 class="card__name">${product.Name}</h2>
          <img src="${product.Image}" alt="${product.Name}" loading="lazy" height="200">
        </a>
      </li>`;

  return card;
}
