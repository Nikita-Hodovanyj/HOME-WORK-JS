import { Request, Response } from "express";
export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
}

export type CreatePostData = Omit<Post, "id">
export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostServiceContract {
    getAllPosts(skip?: number, take?: number): Post[];
    getPostById(id: number): Post | undefined;
    createPost(data: CreatePostData): Promise<Post>;
    updatePost(id: number, data: UpdatePostData): Promise<Post | null>;
  }


  export interface PostControllerContract {
    getAllPosts: (
      req: Request<{}, Post[] | { error: string }, void, { skip?: string; take?: string }>,
      res: Response<Post[] | { error: string }>
    ) => void;
  
    getPostById: (
      req: Request<{ id: string }, Post | { error: string }>,
      res: Response<Post | { error: string }>
    ) => void;
  
    createPost: (
      req: Request<{}, Post | { error: string }, CreatePostData>,
      res: Response<Post | { error: string }>
    ) => Promise<void>;
  
    updatePost: (
      req: Request<{ id: string }, Post | { error: string }, UpdatePostData>,
      res: Response<Post | { error: string }>
    ) => Promise<void>;
  }
  
  