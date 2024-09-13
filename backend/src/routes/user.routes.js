import { Router } from "express";
import { handletodo, handletododel, handletodoget, handletodoput } from "../controllers/todo.controllers.js";

const router = Router();

router.post("/todos",handletodo);
router.get("/todos",handletodoget);
router.put("/todos/:id",handletodoput);
router.delete("/todos/:id",handletododel);

export default router;
