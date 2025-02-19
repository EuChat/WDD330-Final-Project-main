// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};


export function LoadHeaderFooter() {
  // load header
  let header = document.querySelector("#mainHeader");
  header.innerHTML = templateHeader;

  // load footer 
  let footer = document.querySelector("#mainFooter");
  footer.innerHTML = templateFooter;

  // manage hamburger button 
  LoadHam();
  // manage modal 
  HandleModal();
};


function LoadHam() {
  const nav = document.querySelector(".navigation");
  const ham = document.querySelector("#menu");
  ham.addEventListener("click", () => {
    window.scrollX += 10;
    nav.classList.toggle("show");

    if (hamCount == 0) {
      ham.innerHTML = `&times`;
      hamCount = 1;
    }
    else {
      ham.innerHTML = `&#9776`;
      hamCount = 0;
    }
  });
};


export function HandleModal() {
  try {
    let overlay = document.querySelector("#overlay");
    overlay.addEventListener("click", () => {
      CloseModal();
    })
  } catch (error) {
    window.console.log(error);
  }

}

export function CloseModal() {
  try {
    let modal = document.querySelector("#modal");
    let overlay = document.querySelector("#overlay");
    overlay.classList.remove("show");
    modal.classList.remove("show");
  } catch (error) {
    window.console.log(error);
  }

}

export function OpenModal() {
  try {
    let modal = document.querySelector("#modal");
    let overlay = document.querySelector("#overlay");
    overlay.classList.add("show");
    modal.classList.add("show");

    // closing technique 
    let closer = modal.querySelector(".closer");
    closer.addEventListener("click", () => { CloseModal() })
  } catch (error) {
    window.console.log(error);
  }
}

export async function GetRecipes() {
  // const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=8";
  const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=20";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b2c6bd28c4mshedaf2868b74e715p13117cjsn99ea633c26c6",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    window.console.log(result.recipes);
    return result.recipes;

  } catch (error) {
    window.console.log(error);
  }
}

export function DisplayModal(innerHTML) {
  try {
    let modal = document.querySelector("#modal");
    modal.innerHTML = innerHTML;
    OpenModal();
  } catch (error) {
    window.console.log(error);
  }

}


// variables 
// name control for conststancy
export let availableList = "productList";
export let eventsList = "productList";

let hamCount = 0;

const templateHeader = `
  <div class="logo">
  <img src="/images/alexander-mils-nG4ZimMIO_k-unsplash.WebP" alt="tent image for logo" loading="lazy" width="100" height="100"/>
  <a href="/index.html">Food<span class="highlight">Tracker</span></a>
  </div>
  <button type="button" id="menu">&#9776</button>
  <div class="navigation">
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/directories/grocery.html">My Groceries</a></li>
      <li><a href="/directories/meal-planner.html">Meal planner</a></li>
      <li><a href="/directories/recepies-listing.html">Recipes Listing</a></li>
      <li><a href="/directories/search.html">Search Recepies</a></li>
    </ul>
  </div>
  <div id="overlay"></div>
  <div id="modal"></div>
`;

const templateFooter = `&copy;NOT a real business`;