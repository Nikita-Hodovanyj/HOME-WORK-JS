const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const productsPath = path.join(__dirname, 'post.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const postService = {

  getAllPosts(skip, take) {
    let posts = [...products];

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

  getPostById(id) {
    return products.find(p => p.id === id);
  },

  async createPost({ title, description, image }) {
    const newPost = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      title,
      description,
      image
    };

    products.push(newPost);
    await fsPromises.writeFile(productsPath, JSON.stringify(products, null, 2));
    return newPost;
  }
};

module.exports = postService;
