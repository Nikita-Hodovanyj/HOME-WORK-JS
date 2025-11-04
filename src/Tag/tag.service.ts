import { TagRepository } from "./tag.repository";

export const TagService = {
  async getAll(take?: number, skip?: number) {
    return TagRepository.getAll(take, skip);
  },

  async getById(id: number) {
    return TagRepository.getById(id);
  },
};
