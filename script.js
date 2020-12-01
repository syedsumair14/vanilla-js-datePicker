import {addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, fromUnixTime, getUnixTime, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths} from 'date-fns'

const dateSelectorButton = document.querySelector('.date-picker-button')
const datePickerWrapper = document.querySelector('.date-picker')
const currentMonthHeader = document.querySelector('.current-month')
const nextMonthButton = document.querySelector('.next-month-button')
const previousMonthButton = document.querySelector('.prev-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')

let currentDate = new Date()

dateSelectorButton.addEventListener('click', () => {
    datePickerWrapper.classList.toggle('show')
    const selectedDate = fromUnixTime(currentMonthHeader.dataset.selectedDate)
    currentDate = selectedDate
    setupDatePicker(selectedDate)
    setupDates(selectedDate)
})

function setDate(date) {
    dateSelectorButton.innerText = format(date, 'MMMM do, yyyy')
    currentMonthHeader.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(){
    currentMonthHeader.innerText = format(currentDate, 'MMMM - yyyy')
    setupDates()
}


nextMonthButton.addEventListener('click', () => {
    currentDate = addMonths(currentDate, 1)
    const selectedDate = fromUnixTime(currentMonthHeader.dataset.selectedDate)
    setupDatePicker(selectedDate)
})

previousMonthButton.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1)
    const selectedDate = fromUnixTime(currentMonthHeader.dataset.selectedDate)
    setupDatePicker(selectedDate)
})

function setupDates(selectedDate) {
    const dayStart = startOfWeek(startOfMonth(currentDate))
    const dayEnd = endOfWeek(endOfMonth(currentDate))
    dateGrid.innerHTML = ''
    const dates = eachDayOfInterval({start: dayStart, end: dayEnd})

    dates.forEach(date => {
        const btn = document.createElement('button')
        btn.classList.add('date')
        btn.innerText = date.getDate()
        if(!isSameMonth(date, currentDate)) {
            btn.classList.add('date-picker-other-month-date')
        }
        if(isSameDay(date, selectedDate)) {
            btn.classList.add('selected')
        }
        dateGrid.appendChild(btn)
    })
}

setDate(new Date())
