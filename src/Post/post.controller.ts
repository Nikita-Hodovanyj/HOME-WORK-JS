import { Request, Response } from "express";
import { PostControllerContract, CreatePostData, UpdatePostData } from "./post.types";
import { PostService } from "./post.service";

export const postController: PostControllerContract = {
  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : undefined;
      const take = req.query.take ? Number(req.query.take) : undefined;

      if ((skip && isNaN(skip)) || (take && isNaN(take))) {
        res.status(400).json({ error: "skip и take должны быть числами" });
        return;
      }

      const posts = await PostService.getAll(take, skip);
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  async getByID(req: Request<{ id: string }>, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const post = await PostService.getByID(id);
      if (!post) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, content } = req.body as CreatePostData;

      if (typeof title !== "string" || typeof content !== "string") {
        res.status(400).json({ error: "Неверный тип данных" });
        return;
      }

      const newPost = await PostService.create({ title, content });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании поста" });
    }
  },

  async update(req: Request<{ id: string }>, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const data = req.body as UpdatePostData;
      const updatedPost = await PostService.update(id, data);

      if (!updatedPost) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при обновлении поста" });
    }
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const deletedPost = await PostService.delete(id);
      if (!deletedPost) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(deletedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении поста" });
    }
  },
};
