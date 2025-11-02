import express from "express";
import { postController } from "./post.controller";


const PostRouter = express.Router();

PostRouter.get('/', postController.getAll);
PostRouter.get('/:id', postController.getByID);
PostRouter.post('/', postController.create);
PostRouter.patch("/:id", postController.update)
PostRouter.delete("/:id", postController.delete);

export { PostRouter };