const moment = require('moment')
const express = require('express');
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

const app = express();
const PORT = 8000;
function getData(){
    const data = moment().toDate()
    return data
}


function getCurrentWeekday() {
    const weekday = moment().format('dddd')
    return weekday
}


app.get('/timestamp', (req, res) => {
    const now = getData(); 
    res.json({
      timestamp: now,
      weekday: getCurrentWeekday()
    });
  });
  app.listen(PORT, () => {
    console.log(` Сервер запущен: http://localhost:${PORT}`);
  });