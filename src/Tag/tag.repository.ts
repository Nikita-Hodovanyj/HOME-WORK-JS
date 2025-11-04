import { prisma } from "../data/PrismaClient";
import { Tag } from "@prisma/client";

export const TagRepository = {
  async getAll(take?: number, skip?: number): Promise<Tag[]> {
    return prisma.tag.findMany({
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
    });
  },

  async getById(id: number): Promise<Tag | null> {
    return prisma.tag.findUnique({
      where: { id },
    });
  },
};
