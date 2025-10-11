import express, { Request, Response } from "express";
import moment from "moment";
import { PostRouter } from "./Post/post.routes";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/timestamp', (req: Request, res: Response) => {
  const now = moment().toDate();
  const weekday = moment().format('dddd');
  res.json({
    timestamp: now,
    weekday: weekday
  });
});

app.use('/posts', PostRouter); 

app.listen(PORT, () => {
  console.log(` Сервер запущен: http://localhost:${PORT}`);
});
