import { PrismaClient, Prisma } from "@prisma/client";
import { PostServiceContract } from "./post.types";

const prisma = new PrismaClient();

export const PostService: PostServiceContract = {
  async getAll(take?: number, skip?: number) {
    return prisma.post.findMany({
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
      include: { tags: true },
    });
  },

  async getByID(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });
  },

  async create(data: { title: string; content: string }) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  },
  

  async update(id: number, data: Prisma.PostUpdateInput) {
    try {
      return await prisma.post.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },

  async delete(id: number) {
    try {
      return await prisma.post.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === "P2025") return null;
      throw error;
    }
  },
};
