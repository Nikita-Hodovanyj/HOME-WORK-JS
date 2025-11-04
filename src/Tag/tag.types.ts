import { Request, Response } from "express";
import { Prisma, Tag } from "@prisma/client";

export interface TagRepositoryContract {
  getAll(take?: number, skip?: number): Promise<Tag[]>;
  getById(id: number): Promise<Tag | null>;
}

export interface TagServiceContract {
  getAll(take?: number, skip?: number): Promise<Tag[]>;
  getById(id: number): Promise<Tag | null>;
}

export interface TagControllerContract {
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request<{ id: string }>, res: Response): Promise<void>;
}
