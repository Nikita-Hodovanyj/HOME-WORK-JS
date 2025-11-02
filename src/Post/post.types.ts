import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithTags = Prisma.PostGetPayload<{ include: { tags: true } }>;


export type CreatePost = Prisma.PostUncheckedCreateInput;
export type CreatePostChecked = Prisma.PostCreateInput;

export type UpdatePost = Prisma.PostUncheckedUpdateInput;
export type UpdatePostChecked = Prisma.PostUpdateInput;

export type CreatePostData = CreatePost; 
export type UpdatePostData = UpdatePost;

export interface PostServiceContract {
  getAll: (take?: number, skip?: number) => Promise<Post[]>;
  getByID: (id: number) => Promise<Post | null>;
  create: (data: CreatePostData) => Promise<Post>;
  update: (id: number, data: UpdatePostData) => Promise<Post | null>;
  delete: (id: number) => Promise<Post | null>;
}

export interface PostControllerContract {
  getAll: (req: Request, res: Response) => Promise<void>;
  getByID: (req: Request<{ id: string }>, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request<{ id: string }>, res: Response) => Promise<void>;
  delete: (req: Request<{ id: string }>, res: Response) => Promise<void>;
}
