import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

let searchbutton = document.querySelector("#find");
let searchRes = document.querySelector("#result");

searchbutton.oninput = function () {
  GetResult();
};

let Info = new ProductData();
let List = new ProductListing(Info, searchRes);

async function GetResult() {
  let myList = await List.init(true);
  let res = myList.filter((item) =>
    item.title.toLowerCase().includes(searchbutton.value.toLowerCase()),
  );
  List.renderList(res);
  if (searchbutton.value == "") {
    searchRes.innerHTML = ``;
  }
}
