import { Prisma } from "@prisma/client";
import { PostRepository } from "./post.repository";

export const PostService = {
  async getAll(take?: number, skip?: number) {
    return PostRepository.getAll(take, skip);
  },

  async getByID(id: number) {
    return PostRepository.getById(id);
  },

  async create(data: { title: string; content: string }) {
    return PostRepository.create({
      title: data.title,
      content: data.content,
    });
  },

  async update(id: number, data: Prisma.PostUpdateInput) {
    return PostRepository.update(id, data);
  },

  async delete(id: number) {
    return PostRepository.delete(id);
  },
};
