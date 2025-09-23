const moment = require('moment')
const express = require('express');
const fs = require('fs');
const path = require('path');

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

  app.get('/posts', (req, res) => {
      const productsPath = path.join(__dirname, "post.json")
      const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"))
      res.json(products)

    })