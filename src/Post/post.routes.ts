import express from "express";
import { postController } from "./post.controller";

const PostRouter = express.Router();

PostRouter.get('/', postController.getAllPosts);
PostRouter.get('/:id', postController.getPostById);
PostRouter.post('/', postController.createPost);

export { PostRouter };
