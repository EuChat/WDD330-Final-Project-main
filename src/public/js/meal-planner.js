
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
    weekdayNames.forEach(day => {
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
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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
            dayDiv.textContent = i;

            // Highlight today's date
            if (
                i === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
            ) {
                dayDiv.className = "today";
            }

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

// Call the function to build the calendar
createCalendar();