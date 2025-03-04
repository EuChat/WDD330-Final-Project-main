
function productCardTemplate(product) {
  let card = ""
  card = `<li class="product-card">
      <a href="/directories/recipe-details.html?product=${product.title}">
        <h2 class="card__name">${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" loading="lazy" height="200">
      </a>
    </li>`

  return card;
}

export default class ProductListing {
  constructor(dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init(filtered = false) {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list - to be completed
    if (!filtered) {
      this.renderList(list);
    } else {
      return await list;
    }
  }

  renderList(list) {
    try {
      let theList = list.map((item) => productCardTemplate(item));
      document.querySelector(".product-list").innerHTML = theList.join("");
    } catch (error) {
      window.console.log(error);

    }
  }
}