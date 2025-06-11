import {  getDate, getDay, getWeek, getMonth, getYear, 
    addDays, addMonths, addYears, format, getDaysInMonth} from "https://esm.sh/date-fns";

let currentDaySelected = new Date()

const wholeModule = document.querySelector('.date-picker')
const toggleButton = document.querySelector('.date-picker-button')
const monthAndYearHeader = document.querySelector('.current-month')
const prevButton = document.querySelector('.prev-month-button')
const nextButton = document.querySelector('.next-month-button')
const nodeListOfDates = document.querySelectorAll('.date')
let arrayOfDates = Array.from(nodeListOfDates)

let currentMonth = getMonth(currentDaySelected) ///// limited scope
let currentYear = getYear(currentDaySelected) ///// limited scope
let firstOfMonth = new Date(currentYear, currentMonth, 1) ///// limited scope
        let firstDayWeekday = format(firstOfMonth, "e") /////// limited scope
        let prevMonthLength = getDaysInMonth(addMonths(currentDaySelected, -1)) 
        let currentMonthLength = getDaysInMonth(currentDaySelected)
let dateIdNumber = 1; ///////////////////////////////// 

toggleButton.addEventListener("click", () => {
    wholeModule.classList.toggle('show')
})

toggleButton.innerText = format(currentDaySelected, "MMMM do, yyyy")
monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
populateWholeCalendar()

prevButton.addEventListener("click", () => {
    changeMonth(-1)
})
nextButton.addEventListener("click", () => {
    changeMonth(1)
})

document.addEventListener("click", e => {
    if (e.target.matches('.date')) {
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
        console.log(e.target)

        } else if (e.target.classList.contains('nextDay')) {
        currentDaySelected = new Date(year, month + 1, day);
        console.log(e.target)

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
    document.querySelectorAll(`.date`).forEach(el => {
        el.classList.remove('selectedDate')
        el.classList.remove('prevDay')
        el.classList.remove('nextDay')
    })

    currentDaySelected = changeDate(currentDaySelected, 0, value, 0)
    // monthAndYearHeader.innerText = format(currentDaySelected, "MMMM yyyy")
    populateWholeCalendar()
}

function populateWholeCalendar() {
    firstDayWeekday = resetCalendar()
    fillPrevMonthSection()
    fillCurrentMonthSection(currentDaySelected)
    fillNextMonthSection()
}

function resetCalendar() {
    removeStylingFromDates()
    toggleExtraDates("none")
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
            prevTempDate.style = "color: gray"
            prevTempDate.classList.add('prevDay')
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
        nextTempDate.style = "color: gray"
        nextTempDate.classList.add('nextDay')

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
} 

function toggleExtraDates(noneOrBlock) {
    let allExtraDatesAsNodeList = document.querySelectorAll('.hiddenDates');
    let arrayOfExtraDates = Array.from(allExtraDatesAsNodeList)
    
    for (let i = 0; i < arrayOfExtraDates.length; i++) {
    arrayOfExtraDates[i].style = `display: ${noneOrBlock}`
}    
}

function removeStylingFromDates() {
    dateIdNumber = 1;
    for (let i = 1; i <= 42; i++) {
        let unstylizedTempDate = document.querySelector(`#pos-${dateIdNumber}`)
        unstylizedTempDate.style = "color: black"
        dateIdNumber++
    }
}