import { Request, Response } from "express";
import { postService } from "./post.service";
import { CreatePostData, UpdatePostData } from "./post.types";

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
    } catch {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  createPost: async (req: Request, res: Response) => {
    try {
      const { title, description, image } = req.body as CreatePostData;

      if (typeof title !== "string" || typeof description !== "string" || typeof image !== "string") {
        res.status(400).json({ error: "Неверный тип данных" });
        return;
      }

      const newPost = await postService.createPost({ title, description, image });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },

  updatePost: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const data = req.body as UpdatePostData;

      // Проверка типов (если переданы)
      if (
        (data.title && typeof data.title !== "string") ||
        (data.description && typeof data.description !== "string") ||
        (data.image && typeof data.image !== "string")
      ) {
        res.status(400).json({ error: "Неверный тип данных" });
        return;
      }

      const updatedPost = await postService.updatePost(id, data);
      if (!updatedPost) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(updatedPost);
    } catch (error) {
      console.error("Ошибка при обновлении поста:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },
};
