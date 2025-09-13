const moment = require('moment')

// function getCurrentDay() {
//   const day = moment().format('dddd')
//   console.log(day)
// }

// function getCurrentMonth() {
//   const month = moment().format('MMMM')
//   console.log(month)
// }

// function getCurrentYear() {
//   const year = moment().format('YYYY')
//   console.log(year)
// }

// getCurrentDay()
// getCurrentMonth()
// getCurrentYear()


function getData(){
    const data = moment().toDate()
    console.log(data)
}
getData()