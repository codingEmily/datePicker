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

    //   format(new Date(getYear(currentDaySelected), getMonth(currentDaySelected), 1), "e")

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
    populateWholeCalendar()
}

function resetCalendar() {
    emptyCalendarHTML()
    dateIdNumber = 1

    firstDayWeekday = format(new Date(getYear(currentDaySelected), getMonth(currentDaySelected), 1), "e")
}


function populateWholeCalendar() {
    resetCalendar()

    fillPrevMonthSection()
    fillCurrentMonthSection(currentDaySelected)
    fillNextMonthSection()
}

function fillPrevMonthSection() {
    if (firstDayWeekday == "1") {
        return
    } else if (firstDayWeekday != "1") {
        let numOfPrevToShow = firstDayWeekday - 1
        let currDayOfPrevMonth = prevMonthLength - numOfPrevToShow
        
        for (let i = 1; i <= numOfPrevToShow; i++) {
            let prevTempDate = document.querySelector(`#pos-${dateIdNumber}`)
            prevTempDate.innerText = currDayOfPrevMonth
            dateIdNumber++
            currDayOfPrevMonth++
        }
    }
} 

function fillCurrentMonthSection(currentDaySelected) {
    let currentMonthDay = 1
    for (let i = 1; i <= getDaysInMonth(currentDaySelected); i++) {
        let currTempDate = document.querySelector(`#pos-${dateIdNumber}`)

        currTempDate.innerText = currentMonthDay
        currentMonthDay++
        dateIdNumber++
    }
} 

function fillNextMonthSection() {
    // let numOfPrevToShow = firstDayWeekday - 1
    // let numOfDatesFilled = numOfPrevToShow + currentMonthLength

    let daysLeft = 35 - dateIdNumber
    let newMonthDay = 1

    for (let i = dateIdNumber; i <= 35 ; i++) {
        let nextTempDate = document.querySelector(`#pos-${dateIdNumber}`)

        nextTempDate.innerText = newMonthDay
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

function emptyCalendarHTML() {
    dateIdNumber = 1;
        for (let i = 1; i <= 35; i++) {
        let thisTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        thisTempDate.innerText = ""
        dateIdNumber++
    }
} 