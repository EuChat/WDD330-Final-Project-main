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
};

let hamCount = 0;

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

const templateHeader = `<div class="logo">
  <img src="/images/alexander-mils-nG4ZimMIO_k-unsplash.jpg" alt="tent image for logo" />
  <a href="/index.html">Food<span class="highlight">Tracker</span></a>
</div>
  <button type="button" id="menu">&#9776</button>
<div class="navigation">
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/grocery.html">My Groceries</a></li>
    <li><a href="/meal-planner.html">Meal planner</a></li>
    <li><a href="/recepies-listing.html">Discover</a></li>
    <li><a href="/search.html">Search Recepies</a></li>
  </ul>
</div>
`;
const templateFooter = `&copy;NOT a real business`;