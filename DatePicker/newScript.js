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

    dynamicallyGrowCalendar()

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
    // console.log(prevMonthLength)

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
    
    for (let i = 1; i <= getDaysInMonth(currentDaySelected); i++) {
        // the above loop continues to "length of month" EVEN PASS THE CURRENT HTML ELEMENTS

        // possible solve -> 
                // run function that calculates the minimum number of necessary slots, and choose to add HTML if necessary BEFORE you do this step, downside: more functions = more clutter, upside, insures everything runs in correct order
        let currTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        
        console.log("MonthDay: ", currentMonthDay)
        currTempDate.innerText = currentMonthDay
        currentMonthDay++
        dateIdNumber++
        
    }
    if (currentMonthDay < getDaysInMonth(currentDaySelected)) {
        console.log("true")
    //     for (let i = 0; i <= 6; i++) {
    //     // calendarGrid.appendChild('button')
    //     let tempExtraButton = document.createElement('button')
    //     tempExtraButton.id = `pos-${dateIdNumber}`
    //     calendarGrid.appendChild(tempExtraButton)

    //     let button = document.createElement('button')
    //     calendarGrid.appendChild(button)
    // }

    }

        //     <button id = "pos-29" class = "date row-5 col-1 "></button>
        // <button id = "pos-30" class = "date row-5 col-2"></button>
        // <button id = "pos-31" class = "date row-5 col-3"></button>
        // <button id = "pos-32" class = "date row-5 col-4"></button>
        // <button id = "pos-33" class = "date row-5 col-5"></button>
        // <button id = "pos-34" class = "date row-5 col-6"></button>
        // <button id = "pos-35" class = "date row-5 col-7"></button>
} 

function fillNextMonthSection() {
    // console.log(firstDayWeekday)
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

function dynamicallyGrowCalendar() {
    // add ONE ROW of dates to the END, assign all the necessary ids/classes
    //      calculate which dateIdNumber these should be at so they work same as the hardcoded dates >>>> JUST START AT 36 DUH!!! 

    // do NOT add inner Text, this is happen in regular fillCalendar functions
    // these WILL NEEED TO BE REMOVED in the reset function

    let numOfPrevToShow = (Number(firstDayWeekday)) - 1
    if (numOfPrevToShow + getDaysInMonth(currentDaySelected) > 35) {
        for (let i = 0; i <= 6; i++) {
            extraDateNumber = 1

            let tempExtraButton = document.createElement('button')
            tempExtraButton.id = `pos-${dateIdNumber + extraDateNumber}`
            // tempExtraButton.innerText = dateIdNumber
            calendarGrid.appendChild(tempExtraButton)

            extraDateNumber++
        }
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

function removeStylingFromDates() {

}