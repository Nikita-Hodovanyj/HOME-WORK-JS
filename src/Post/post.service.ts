import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

const productsPath: string = path.join(__dirname, 'post.json');
const products: Post[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const postService = {
  getAllPosts(skip?: string | number, take?: string | number): Post[] {
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
    return products.find(p => p.id === id);
  },

  async createPost({ title, description, image }: { title: string; description: string; image: string; }): Promise<Post> {
    const newPost: Post = {
      id: products.length > 0 ? (products[products.length - 1]?.id ?? 0) + 1 : 1,
      title,
      description,
      image
    };

    products.push(newPost);
    await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 2));
    return newPost;
  }
};

export { postService };
