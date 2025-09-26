const moment = require('moment')
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

const productsPath = path.join(__dirname, "post.json")
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"))

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
    let { skip, take } = req.query;
  
 
    if (skip && take) {
      skip = Number(skip);
      take = Number(take);
  
      if (isNaN(skip) || isNaN(take)) {
        res.status(400).json({ error: "skip и take должны быть числами" });
        return 
      }
  
      res.json(products.slice(skip, skip + take));
      return 
    }
  
    
    if (take) {
      take = Number(take);
      if (isNaN(take)) {
        res.status(400).json({ error: "take должно быть числом" });
        return 
      }
      res.json(products.slice(0, take));
      return 
    }
  
    
    if (skip) {
      skip = Number(skip);
      if (isNaN(skip)) {
        res.status(400).json({ error: "skip должно быть числом" });
        return 
      }
      res.json(products.slice(skip));
      return 
    }
  
 
    res.json(products);
  });
  
 
  app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
  
    if (isNaN(id)) {
      res.status(400).json({ error: "id должно быть числом" });
      return 
    }
  
    const post = products.find(p => p.id === id);
  
    if (!post) {
      res.status(404).json({ error: "Пост не найден" });
      return 
    }
  
    res.json(post);
  });
  
 









