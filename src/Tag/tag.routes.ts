import express from "express";
import { TagController } from "./tag.controller";

const TagRouter = express.Router();

TagRouter.get("/", TagController.getAll);
TagRouter.get("/:id", TagController.getById);

export { TagRouter };
