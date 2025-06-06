import {  getDate, getDay, getWeek, getMonth, getYear, 
    addDays, addMonths, addYears, format, getDaysInMonth} from "https://esm.sh/date-fns";
// import { formatDistance, subDays } from "https://esm.sh/date-fns";

const today = new Date()
let currentDate = today
const formattedToday = format(today, "MMMM do, yyyy")
const formattedThisMonthAndYear = format(today, "MMMM - yyyy")

const toggleButton = document.querySelector('.date-picker-button')
const lastMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')

const wholeModule = document.querySelector('.date-picker')
const currentMonthDisplay = document.querySelector(".current-month")
const listOf35DayContainers = document.querySelectorAll('.date')

toggleButton.innerText = formattedToday
currentMonthDisplay.innerText = formattedThisMonthAndYear

toggleButton.addEventListener("click", () => {
    wholeModule.classList.toggle("show")
})



document.addEventListener("click", e => {
    if (e.target.matches('.date')) {
        e.target.innerText = "1"
    }
    if ( e.target === (lastMonthButton)) {
        currentDate = changeDate(currentDate, 0, -1, 0)
        
    }
    if ( e.target === (nextMonthButton)) {
        currentDate = changeDate(currentDate, 0, 1, 0)
    }
    toggleButton.innerText = format(currentDate, 'MMMM do, yyyy')
    currentMonthDisplay.innerText = format(currentDate, "MMMM - yyyy")

    let currentMonth = getMonth(currentDate) ///// not updating 
    let currentYear = getYear(currentDate) ///// not updating 
    let firstOfMonth = new Date(currentYear, currentMonth, 1) ///// not updating 
    let firstDayWeekday = format(firstOfMonth, "e") /////// Not updating
    let lengthOfMonth = getDaysInMonth(currentDate)
    let prevMonthLength = getDaysInMonth((currentDate) - 1) 

    console.log(lengthOfMonth)
    calculatePopulatingCalendar(firstDayWeekday)
    finishPrevMonth(currentDate, firstDayWeekday)
})

function finishPrevMonth(currentDate, firstDayWeekday) {
    if (firstDayWeekday != 1) {
        let prevMonthLength = getDaysInMonth((currentDate) - 1)

        for (let i = firstDayWeekday; i >= 1; i--) {
            let prevMonthDay = prevMonthLength;
            let incrementBackwards = 1
            let colNumber = firstDayWeekday - incrementBackwards

            let currentDayPos = document.querySelector('.row-1' && `.col-${colNumber}`) 
            console.log(currentDayPos)
            currentDayPos.style = "color: gray"
            currentDayPos.innerText = prevMonthDay

            prevMonthDay =  prevMonthDay - 1;
            incrementBackwards++

            console.log(prevMonthDay)
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

function calculatePopulatingCalendar(dayToCompare) {
    switch (dayToCompare) {
        case "1":
            document.querySelector('.row-1' && '.col-1').innerText = "1"
            break;
        case "2":
            document.querySelector('.row-1' && '.col-2').innerText = "1"
            break;
        case "3":
            document.querySelector('.row-1' && '.col-3').innerText = "1"
            break;
        case "4":
            document.querySelector('.row-1' && '.col-4').innerText = "1"
            break;
        case "5":
            document.querySelector('.row-1' && '.col-5').innerText = "1"
            break;
        case "6":
            document.querySelector('.row-1' && '.col-6').innerText = "1"
            break;
        case "7":
            document.querySelector('.row-1' && '.col-7').innerText = "1"
            break;
        default:
            console.error("error on the switch, probably incorrect accessing")
    }
} 
