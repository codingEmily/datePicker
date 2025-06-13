import {  getMonth, getYear, addDays, addMonths, addYears, format, getDaysInMonth, getUnixTime, fromUnixTime, subMonths, startOfWeek, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "https://esm.sh/date-fns";

const wholeModule = document.querySelector('.date-picker')
const toggleButton = document.querySelector('.date-picker-button')
const monthAndYearHeader = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev-month-button')
const nextButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentViewDate = new Date()


setupDatePicker(currentViewDate)
toggleButton.addEventListener("click", () => {
    wholeModule.classList.toggle('show')
    const selectedDate = fromUnixTime(toggleButton.dataset.selectedDate)
    currentViewDate = selectedDate

    setupDatePicker(selectedDate)
})

function setDate(date) {
    toggleButton.innerText = format(date, "MMMM do, yyyy")
    toggleButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
    monthAndYearHeader.innerText = format(currentViewDate, "MMMM - yyyy")
    setupDates(selectedDate)
}

function setupDates(selectedDate) {
    const firstWeekStart = startOfWeek(startOfMonth(currentViewDate))
    const lastWeekEnd = endOfWeek(endOfMonth(currentViewDate))
    const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd})
    dateGrid.innerHTML = ""

    dates.forEach(date => {
        const dateElement = document.createElement('button')
        dateElement.classList.add('date')
        dateElement.innerText = date.getDate()
        if (!isSameMonth(date, currentViewDate)) {
            dateElement.classList.add('date-picker-other-month-date')
        }
        if (isSameDay(date, selectedDate)) {
            dateElement.classList.add('selected')
        }

        dateElement.addEventListener("click", () => {
            setDate(date)
            datePickerModule.classList.remove("show")
        })
        dateGrid.appendChild(dateElement)
        
    })
}

document.addEventListener("click", e => { 
    if (e.target.matches('.date') ) {
        document.querySelectorAll(`.date.selected`).forEach(el => {
            el.classList.remove('selected');
        })
        e.target.classList.add('selected');
    }
})

prevButton.addEventListener("click", () => {
    const selectedDate = fromUnixTime(toggleButton.dataset.selectedDate)
    currentViewDate = subMonths(currentViewDate, 1)
    setupDatePicker(selectedDate)
})
nextButton.addEventListener("click", () => {
    const selectedDate = fromUnixTime(toggleButton.dataset.selectedDate)
    currentViewDate = addMonths(currentViewDate, 1)
    setupDatePicker(selectedDate)
})
setDate(new Date())
