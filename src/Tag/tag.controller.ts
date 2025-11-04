import { Request, Response } from "express";
import { TagService } from "./tag.service";

export const TagController = {
  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : undefined;
      const take = req.query.take ? Number(req.query.take) : undefined;

      if ((skip && isNaN(skip)) || (take && isNaN(take))) {
        res.status(400).json({ error: "skip и take должны быть числами" });
        return;
      }

      const tags = await TagService.getAll(take, skip);
      res.json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении тегов" });
    }
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const tag = await TagService.getById(id);
      if (!tag) {
        res.status(404).json({ error: "Тег не найден" });
        return;
      }

      res.json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении тега" });
    }
  },
};
