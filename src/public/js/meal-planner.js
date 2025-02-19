import { DisplayModal, getLocalStorage, setLocalStorage, eventsList } from "./utils.mjs";


// Create the calendar dynamically
function createCalendar() {
  const calendarContainer = document.querySelector("#calendar");

  // Header (Month and Navigation)
  const header = document.createElement("div");
  header.className = "month";

  const prevButton = document.createElement("button");
  prevButton.textContent = "❮";
  const nextButton = document.createElement("button");
  nextButton.textContent = "❯";

  const monthYear = document.createElement("h2");
  monthYear.id = "month-year";

  header.appendChild(prevButton);
  header.appendChild(monthYear);
  header.appendChild(nextButton);

  // Weekday names
  const weekdays = document.createElement("div");
  weekdays.className = "weekdays";
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdayNames.forEach((day) => {
    const div = document.createElement("div");
    div.textContent = day;
    weekdays.appendChild(div);
  });

  // Days container
  const days = document.createElement("div");
  days.className = "days";

  // Append everything to the calendar container
  calendarContainer.appendChild(header);
  calendarContainer.appendChild(weekdays);
  calendarContainer.appendChild(days);

  // Update the calendar display
  let currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update month and year display
    monthYear.textContent = `${months[month]} ${year}`;

    // Clear previous days
    days.innerHTML = "";

    // Get the first and last day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement("div");
      days.appendChild(emptyDiv);
    }

    // Add days of the month
    for (let i = 1; i <= lastDate; i++) {
      const dayDiv = document.createElement("div");
      const numberDay = document.createElement("p");

      dayDiv.setAttribute("class", "day");

      // data of the day 
      dayDiv.data = document.createElement("div");
      dayDiv.data.innerHTML = `What's happening on ${i}?`;
      dayDiv.meals = [];
      dayDiv.month = month;
      dayDiv.year = year;
      dayDiv.numbre = i;

      numberDay.textContent = i;

      // Highlight today's date
      if (
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      dayDiv.appendChild(numberDay);
      days.appendChild(dayDiv);
    }
  }

  // Handle navigation
  prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Render the initial calendar
  renderCalendar(currentDate);
}

function DisplayMealDetails() {
  let days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", () => {
      DisplayModal(TemplateEvent());
      EmpowerButtons(day);
    });
  });
}

// Call the function to build the calendar
createCalendar();
RestoreMeals();
DisplayMealDetails();

function TemplateEvent() {
  let output = `<div class="ModalHead">
                    <h3>Plan Meal<h3> 
                    <button type="button" class="closer">&times</button>
                </div>
                <div class="ModalContent">
                    <div class="ModalButtons">
                        <button type="button" class="addMeal" >Add meal</button>
                        <button type="button" class="removeMeal" >Remove meal</button>
                        <button type="button" class="display" >Display current Recipe</button>
                    </div>
                    <div class="ModalDisplay">
                    </div>
                </div>`;
  return output;
}

function EmpowerButtons(day) {
  // window.console.log(day.meals);
  // showing the meals 
  let adder = document.querySelector(".addMeal");
  adder.addEventListener("click", () => {
    renderCartContents(".ModalDisplay");
    EmpowerAdder(day);
  });

  // removing meal 
  let remover = document.querySelector(".removeMeal");
  remover.addEventListener("click", () => {
    let victim = document.querySelector(".ModalDisplay");
    day.meals = [];
    victim.innerHTML = day.meals;
    day.classList.remove("set");
  })

  // showing current meal s
  let shower = document.querySelector(".display");
  shower.addEventListener("click", () => {
    let victim = document.querySelector(".ModalDisplay");
    victim.innerHTML = ``;
    let myUl = document.createElement("ul");
    // window.console.log(day.meals);
    day.meals.forEach((meal) => {
      myUl.innerHTML += cartItemTemplate(meal, false);
    })
    victim.appendChild(myUl);
  });

}


function EmpowerAdder(day) {

  // actually adding the meal
  let scheduler = document.querySelectorAll(".selector");
  scheduler.forEach((button) => {
    button.addEventListener("click", () => {
      day.classList.add("set")
      let cartItems = getLocalStorage("so-cart") || [];
      let result = cartItems.find((item) => item.id == button.value);
      // window.console.log(result);
      day.meals.push(result);
      let mealsStored = getLocalStorage(eventsList) || [];

      let storageObject = {
        "number": day.number,
        "month": day.month,
        "year": day.year,
        "meals": day.meals
      }
      mealsStored.push(storageObject);
      // window.console.log(day.meals);
    })
  });
}

function RestoreMeals() {
  let myList = getLocalStorage(eventsList);
  let days = document.querySelectorAll(".day");
  myList.forEach((mealEvent) => {
    days.forEach((day) => {
      if (day.number == mealEvent.number && day.year == mealEvent.year && day.month == mealEvent.month) {
        day.classList.add("set")
      }
    })
  })
}

// cart details added
function renderCartContents(theLocation = ".product-list") {
  let cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(theLocation).innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, AddingMode = true) {
  let newItem = "";
  if (AddingMode) {
    newItem = `<li class="cart-card divider">
    <div class="cart-card__image">
      <img src="${item.image}" alt="${item.title}" loading="lazy" >
    </div>

    <div>
      <h2 class="card__name">${item.title}</h2>
    </div>

    <button class="selector" value="${item.id}">&plus;</button>
  </li>`;
  } else {
    newItem = `<li class="cart-card divider">
    <div class="cart-card__image">
      <img src="${item.image}" alt="${item.title}" loading="lazy" >
    </div>

    <div>
      <h2 class="card__name">${item.title}</h2>
    </div>

  </li>`;
  }

  return newItem;
}
