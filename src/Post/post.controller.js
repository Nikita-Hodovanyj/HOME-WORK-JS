const postService = require('./post.service');

const postController = {

  getAllPosts: (req, res) => {
    try {
      const { skip, take } = req.query;
      const posts = postService.getAllPosts(skip, take);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },


  getPostById: (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "id должно быть числом" });
        return;
      }

      const post = postService.getPostById(id);
      if (!post) {
        res.status(404).json({ error: "Пост не найден" });
        return;
      }

      res.json(post);
    } catch (err) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  },


  createPost: async (req, res) => {
    try {
      const body = req.body;

      if (!body) {
        res.status(422).json({ error: "Требуется тело" });
        return;
      }

      const { title, description, image } = body;

      if (!title) {
        res.status(422).json({ error: "Требуется название" });
        return;
      }
      if (!description) {
        res.status(422).json({ error: "Требуется описание" });
        return;
      }
      if (!image) {
        res.status(422).json({ error: "Требуется картинка" });
        return;
      }

      const newPost = await postService.createPost({ title, description, image });
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
};

module.exports = postController;
