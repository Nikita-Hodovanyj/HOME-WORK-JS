import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { Post, CreatePostData, UpdatePostData, PostServiceContract } from "./post.types";

const productsPath: string = path.join(__dirname, "post.json");
const products: Post[] = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

export const postService: PostServiceContract = {
  getAllPosts(skip?: number, take?: number): Post[] {
    let posts: Post[] = [...products];

    if (skip && take) {
      skip = Number(skip);
      take = Number(take);
      if (isNaN(skip) || isNaN(take)) throw new Error("skip и take должны быть числами");
      return posts.slice(skip, skip + take);
    }

    if (take) {
      take = Number(take);
      if (isNaN(take)) throw new Error("take должно быть числом");
      return posts.slice(0, take);
    }

    if (skip) {
      skip = Number(skip);
      if (isNaN(skip)) throw new Error("skip должно быть числом");
      return posts.slice(skip);
    }

    return posts;
  },

  getPostById(id: number): Post | undefined {
    return products.find((p) => p.id === id);
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const newPost: Post = {
      id:
        products.length > 0
          ? (products[products.length - 1]?.id ?? 0) + 1
          : 1,
      ...data,
    };

    products.push(newPost);
    await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 2));
    return newPost;
  },

  async updatePost(id: number, data: UpdatePostData): Promise<Post | null> {
    const postIndex = products.findIndex((p) => p.id === id);
    if (postIndex === -1) return null;

    const updatedPost: Post = { ...products[postIndex], ...data } as Post;
    products[postIndex] = updatedPost;

    await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 2));
    return updatedPost;
  },
};
