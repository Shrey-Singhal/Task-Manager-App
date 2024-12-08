import { Router } from 'express'
import * as taskController from '../controllers/taskController'

const router = Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);
router.put("/:id", taskController.updateTask);

export default router;