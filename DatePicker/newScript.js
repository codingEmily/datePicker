import {  getDate, getDay, getWeek, getMonth, getYear, 
    addDays, addMonths, addYears, format, getDaysInMonth} from "https://esm.sh/date-fns";

let currentDaySelected = new Date()
let arrayOfDates = []

const wholeModule = document.querySelector('.date-picker')
const toggleButton = document.querySelector('.date-picker-button')
const monthAndYearHeader = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev-month-button')
const nextButton = document.querySelector('.next-month-button')

let dateIdNumber = 1; ///////////////////////////////// 
// let tempDate = document.querySelector(`#pos-${dateIdNumber}`)

toggleButton.addEventListener("click", () => {
    wholeModule.classList.toggle('show')
})

let currentMonth = getMonth(currentDaySelected) ///// not updating 
let currentYear = getYear(currentDaySelected) ///// not updating 
let firstOfMonth = new Date(currentYear, currentMonth, 1) ///// not updating 
        let firstDayWeekday = format(firstOfMonth, "e") /////// Not updating
        let prevMonthLength = getDaysInMonth(addMonths(currentDaySelected, -1)) 
        let currentMonthLength = getDaysInMonth(currentDaySelected)

toggleButton.innerText = format(currentDaySelected, "MMMM do, yyyy")
monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
populateWholeCalendar()

// document.addEventListener("click", e => {
//     if (e.target.matches('.prev-month-button')) {
//     changeMonth(-1)
//     } else if (e.target.matches('.next-month-button')) {
//     changeMonth(1)
//     }
// })

prevButton.addEventListener("click", () => {
    changeMonth(-1)
})
nextButton.addEventListener("click", () => {
    changeMonth(1)
})

function changeMonth(value) {
    currentDaySelected = changeDate(currentDaySelected, 0, value, 0)
    toggleButton.innerText = format(currentDaySelected, "MMMM do, yyyy")
    monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
    dateIdNumber = 1
    populateWholeCalendar()
}

/// setting initial dates
function populateWholeCalendar() {
    dateIdNumber = 1
    populateCalendarPrevMonthSection()
    populateCalendarCurrentMonthSection(currentDaySelected)
    populateCalendarNextMonthSection()
}

function populateCalendarPrevMonthSection(r) {
    if (firstDayWeekday == "1") {
        return
    } else {
        let numOfPrevToShow = firstDayWeekday - 1
        let currDayOfPrevMonth = prevMonthLength - numOfPrevToShow
        
        for (let i = 1; i <= numOfPrevToShow; i++) {
            let tempDate = document.querySelector(`#pos-${dateIdNumber}`)
            tempDate.innerText = currDayOfPrevMonth
            dateIdNumber++
            currDayOfPrevMonth++
    }
    }
} 

function populateCalendarCurrentMonthSection(currentDaySelected) {
    let currentMonthDay = 1
    for (let i = 1; i <= getDaysInMonth(currentDaySelected); i++) {
        let tempDate = document.querySelector(`#pos-${dateIdNumber}`)
        tempDate.innerText = currentMonthDay
        currentMonthDay++
        dateIdNumber++
    }
} 

function populateCalendarNextMonthSection() {
    let numOfPrevToShow = firstDayWeekday - 1
    let numOfDatesFilled = numOfPrevToShow + currentMonthLength
    let daysLeft = 35 - numOfDatesFilled

    let newMonthDay = 1

    for (let i = 1; i <= daysLeft; i++) {
        let tempDate = document.querySelector(`#pos-${dateIdNumber}`)
        tempDate.innerText = newMonthDay
        dateIdNumber++
        newMonthDay++
    }
}

function changeDate(date, daysToAdd, monthsToAdd, yearsToAdd) {
    let returnedDate
    if (daysToAdd != 0) {
        date  = addDays(date, daysToAdd)
    }
    if (monthsToAdd != 0) {
        date  = addMonths(date, monthsToAdd)
    }
    if (yearsToAdd != 0) {
        date  = addYears(date, yearsToAdd)
    }
    returnedDate = date
    return returnedDate
}


//   <div class="date-picker-container">
//     <button class="date-picker-button"></button>
//     <div class="date-picker show">
//       <div class="date-picker-header">
//         <button class="prev-month-button month-button">&larr;</button>
//         <div class="current-month"></div>
//         <button class="next-month-button month-button">&rarr;</button>
//       </div>
//       <div class="date-picker-grid-header date-picker-grid">
//         <div>Sun</div>
//         <div>Mon</div>
//         <div>Tue</div>
//         <div>Wed</div>
//         <div>Thu</div>
//         <div>Fri</div>
//         <div>Sat</div>
//       </div>
//       <div class="date-picker-grid-dates date-picker-grid">
//         <button id = "1" class="date row-1 col-1 ">1x1</button>
//         <button id = "2" class="date row-1 col-2">1x2</button>