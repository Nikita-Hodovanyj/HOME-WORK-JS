import { Request, Response } from "express";
import { postService } from "./post.service";

export const postController = {
  getAllPosts: (req: Request, res: Response) => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : undefined;
      const take = req.query.take ? Number(req.query.take) : undefined;

      if ((skip !== undefined && isNaN(skip)) || (take !== undefined && isNaN(take))) {
        res.status(400).json({ error: "skip и take должны быть числами" });
        return;
      }

      const posts = postService.getAllPosts(skip, take);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  getPostById: (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const post = postService.getPostById(id);
      if (!post) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(post);
    } catch (err) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  createPost: (req: Request, res: Response) => {
    try {
      const { title, description, image } = req.body as {
        title?: string;
        description?: string;
        image?: string;
      };

      if (!title) {
        res.status(422).json({ error: "Требуется название" });
        return;
      }
      if (!description) {
        res.status(422).json({ error: "Требуется описание" });
        return;
      }
      if (!image) {
        res.status(422).json({ error: "Требуется картинка" });
        return;
      }

      const newPost = postService.createPost({ title, description, image });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
};
