import {  getDate, getDay, getWeek, getMonth, getYear, 
    addDays, addMonths, addYears, format, getDaysInMonth} from "https://esm.sh/date-fns";

let currentDaySelected = new Date()
let arrayOfDates = []

const wholeModule = document.querySelector('.date-picker')
const toggleButton = document.querySelector('.date-picker-button')
const monthAndYearHeader = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev-month-button')
const nextButton = document.querySelector('.next-month-button')
const calendarGrid = document.querySelector('.date-picker-grid-dates')
// console.log(calendarGrid)
// 
//  <div class="date-picker-grid-dates date-picker-grid">

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

function populateWholeCalendar() {
    firstDayWeekday = resetCalendar()

    fillPrevMonthSection()
    fillCurrentMonthSection(currentDaySelected)
    fillNextMonthSection()
}

function resetCalendar() {
    emptyCalendarHTML()
    dateIdNumber = 1

    return firstDayWeekday = format(new Date(getYear(currentDaySelected), getMonth(currentDaySelected), 1), "e")
}

function fillPrevMonthSection() {
    prevMonthLength = getDaysInMonth(addMonths(currentDaySelected, -1)) 

    if (firstDayWeekday == "1") {
        return
    } else if (firstDayWeekday != "1") {
        let numOfPrevToShow = (Number(firstDayWeekday)) - 1
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
    let numOfPrevToShow = (Number(firstDayWeekday)) - 1
    
    for (let i = 1; i <= getDaysInMonth(currentDaySelected); i++) {
        let currTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        
        console.log("MonthDay: ", currentMonthDay)
        currTempDate.innerText = currentMonthDay
        currentMonthDay++
        dateIdNumber++
        
    }
    if (numOfPrevToShow + getDaysInMonth(currentDaySelected) > 35) {
        toggleExtraDates("block")
    }
} 

function fillNextMonthSection() {
    let newMonthDay = 1

    for (let i = dateIdNumber; i <= 42 ; i++) {
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
        for (let i = 1; i <= 42; i++) {
        let thisTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        thisTempDate.innerText = ""
        dateIdNumber++
    }
    toggleExtraDates("none")
} 

function toggleExtraDates(noneOrBlock) {
    let allExtraDatesForTestingPurposes = document.querySelectorAll('.hiddenDates');
    let arrayOfExtraDates = Array.from(allExtraDatesForTestingPurposes)
    
    for (let i = 0; i < arrayOfExtraDates.length; i++) {
    arrayOfExtraDates[i].style = `display: ${noneOrBlock}`
}    
}

function removeStylingFromDates() {

}