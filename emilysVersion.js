import {  getDate, getDay, getWeek, getMonth, getYear, 
    addDays, addMonths, addYears, format, getDaysInMonth} from "https://esm.sh/date-fns";

let currentDaySelected = new Date()
let currientViewDate = new Date(currentDaySelected)

const wholeModule = document.querySelector('.date-picker')
const toggleButton = document.querySelector('.date-picker-button')
const monthAndYearHeader = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev-month-button')
const nextButton = document.querySelector('.next-month-button')

let currentMonth = getMonth(currentDaySelected) ///// limited scope
let currentYear = getYear(currentDaySelected) ///// limited scope
let firstOfMonth = new Date(currentYear, currentMonth, 1) ///// limited scope
let firstDayWeekday = format(firstOfMonth, "e") /////// limited scope
let prevMonthLength = getDaysInMonth(addMonths(currentDaySelected, -1)) 
//         let currentMonthLength = getDaysInMonth(currentDaySelected)
let dateIdNumber = 1; ///////////////////////////////// 

toggleButton.addEventListener("click", () => {
    wholeModule.classList.toggle('show')
})

prevButton.addEventListener("click", () => changeMonth(-1))
nextButton.addEventListener("click", () => changeMonth(1))  /// THESE BUTTONS NO LONGER WORK. They iterate based on the CURRENT SELECTED MONTH DATE rather than the "currently viewed month" meaning if I'm looking at september, and I select an august date from the grayed out area, when I click the prevButton, the calendar skips August and goes to July
// CHOICE -> 1. Make it so you iterate thru months based on "month listed in header, converted to Number()" 
// ->  2. Make it so that grayed out dates (prevMonth and nextMonth) are not selectable
// ->  3. Make it so that as soon as you click a grayed out date, the calendar jumps to that date's month 

toggleButton.innerText = format(currentDaySelected, "MMMM do, yyyy")
monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
populateWholeCalendar()



document.addEventListener("click", e => { //likely problem area, whole eventListener
    if (
        e.target.matches('.date') 
        && !e.target.matches('.prevDay')
        && !e.target.matches('.nextDay')
) 
{
        document.querySelectorAll(`.date.selectedDate`).forEach(el => {
            el.classList.remove('selectedDate');
        })
        e.target.classList.add('selectedDate');

        let dataArray = parseMonthAndYear()
        let month = dataArray[0]
        let year = Number(dataArray[1])
        let day = Number(e.target.innerText)

        if (e.target.classList.contains('prevDay')) {
        currentDaySelected = new Date(year, month - 1, day);
        console.log(e.target) //// completely unnecessary WHILE the prevDay & nextDay dates are un-selectable, BUT I might change that feature soon

        } else if (e.target.classList.contains('nextDay')) {
        currentDaySelected = new Date(year, month + 1, day);
        console.log(e.target)  //// completely unnecessary WHILE the prevDay & nextDay dates are un-selectable, BUT I might change that feature soon

        } else {
        currentDaySelected = new Date(year, month, day);
        console.log(e.target)

        }
        toggleButton.innerText = format(currentDaySelected, "MMMM do, yyyy")
    }
})
function parseMonthAndYear() {
    let monthAndYearFullString = monthAndYearHeader.innerText
    let monthAndYearAsArrayOfStrings =  monthAndYearFullString.split(" ")
    let monthNumber
    let dataArray = []

       switch (monthAndYearAsArrayOfStrings[0]) {
        case "January":
            monthNumber = 0
            break;
        case "February":
            monthNumber = 1
            break;
        case "March":
            monthNumber = 2
            break;
        case "April":
            monthNumber = 3
            break;
        case "May":
            monthNumber = 4
            break;
        case "June":
            monthNumber = 5
            break;
        case "July":
            monthNumber = 6
            break;
        case "August":
            monthNumber = 7
            break;
        case "September":
            monthNumber = 8
            break;
        case "October":
            monthNumber = 9
            break;
        case "November":
            monthNumber = 10
            break;
        case "December":
            monthNumber = 11
            break;
        }
        dataArray.push(monthNumber, monthAndYearAsArrayOfStrings[1])
    return dataArray
}

function changeMonth(value) {
    clearDateClasses();
    currentDaySelected = changeDate(currentDaySelected, 0, value, 0) ///
    monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
    populateWholeCalendar()
}

function populateWholeCalendar() {
    firstDayWeekday = resetCalendar()
    fillPrevMonthSection(firstDayWeekday)
    fillCurrentMonthSection()
    fillNextMonthSection()

}

function resetCalendar() {
    removeStylingFromDates()
    toggleExtraDates("none")
    emptyCalendarHTML()
    
    dateIdNumber = 1
    return format(new Date(getYear(currentDaySelected), getMonth(currentDaySelected), 1), "e")
}

function fillPrevMonthSection(firstDayWeekday) {
    prevMonthLength = getDaysInMonth(addMonths(currentDaySelected, -1)) 
    let numOfPrevToShow = (Number(firstDayWeekday)) - 1
    if (numOfPrevToShow <= 0) return
    
    let startDay = prevMonthLength - numOfPrevToShow + 1
    for (let i = 0; i < numOfPrevToShow; i++) {
        let el = document.querySelector(`#pos-${dateIdNumber}`)
        el.innerText = startDay++
        el.style.color = "gray"
        el.classList.add('prevDay')  /// may be related to broken logic
        dateIdNumber++
    }
} 
/////////////////////////////////////////////////////////////////////////
function fillCurrentMonthSection() {
    // let currentMonthDay = 1
    // let numOfPrevToShow = (Number(firstDayWeekday)) - 1
    let lengthOfMonth = getDaysInMonth(currentDaySelected)
    for (let i = 1; i <= lengthOfMonth; i++) {
        let tempEl = document.querySelector(`#pos-${dateIdNumber}`)
        tempEl.innerText = i
        // currentMonthDay++
        dateIdNumber++ 
    }
    toggleExtraDates(dateIdNumber >= 36 ? "block" : "none")
    // if (numOfPrevToShow + getDaysInMonth(currentDaySelected) > 35) {
    //     console.log(getDaysInMonth(currentDaySelected))
    //     // console.log("yes")
    //     toggleExtraDates("block")
    // } ////////////////////////////////////////////////////////////////////////
    // else if (numOfPrevToShow + getDaysInMonth(currentDaySelected) <= 35) {
    //     console.log("no")
    //     toggleExtraDates("none")
    // }
} 

function fillNextMonthSection() {
    let newMonthDay = 1

    for (let i = dateIdNumber; i <= 42 ; i++) {   
        let nextTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        nextTempDate.style = "color: gray"
        nextTempDate.classList.add('nextDay') //// may be related to broken logic

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
    // dateIdNumber = 1;
        for (let i = 1; i <= 42; i++) {
        let tempEl = document.querySelector(`#pos-${i}`)
        tempEl.innerText = ""
        // dateIdNumber++
    }
} 

function toggleExtraDates(noneOrBlock) {
    document.querySelectorAll('.date.hiddenDates').forEach(date => {
        date.style.display = noneOrBlock
    })
//     let allExtraDatesAsNodeList = document.querySelectorAll('.date.hiddenDates');
//     let arrayOfExtraDates = Array.from(allExtraDatesAsNodeList)
    
//     for (let i = 0; i < arrayOfExtraDates.length; i++) {
//     arrayOfExtraDates[i].style = `display: ${noneOrBlock}`
// }    
}

function removeStylingFromDates() {
    // dateIdNumber = 1;
    for (let i = 1; i <= 42; i++) {
        let unstylizedTempDate = document.querySelector(`#pos-${i}`)
        unstylizedTempDate.style = "color: black"
        // dateIdNumber++
    }
}

function clearDateClasses() {
        document.querySelectorAll(`.date`).forEach(el => {//////////////// likely problem area
        el.classList.remove('selectedDate') ///
        el.classList.remove('prevDay')///
        el.classList.remove('nextDay')///
    })////////////////////////////////////
}

