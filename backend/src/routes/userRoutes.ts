import { Router } from "express";
import * as UserController from "../controllers/userController"
const router = Router();

router.post("/", UserController.createUser);
router.post("/:userId/tasks", UserController.addUserTask);

export default router;