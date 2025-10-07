const express = require('express');
const moment = require('moment');
const postRouter = require('./Post/post.routes');

const app = express();
const PORT = 8000;

app.use(express.json());


app.get('/timestamp', (req, res) => {
  const now = moment().toDate();
  const weekday = moment().format('dddd');
  res.json({
    timestamp: now,
    weekday: weekday
  });
});


app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(` Сервер запущен: http://localhost:${PORT}`);
});
