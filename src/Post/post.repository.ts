import { prisma } from "../data/PrismaClient";
import { Prisma, Post } from "@prisma/client";

export const PostRepository = {
  async getAll(take?: number, skip?: number): Promise<Post[]> {
    return prisma.post.findMany({
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
      include: { tags: true },
    });
  },

  async getById(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });
  },

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return prisma.post.create({ data });
  },

  async update(id: number, data: Prisma.PostUpdateInput): Promise<Post | null> {
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

  async delete(id: number): Promise<Post | null> {
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
