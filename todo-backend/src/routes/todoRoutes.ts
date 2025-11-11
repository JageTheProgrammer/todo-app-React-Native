import { Router, Request, Response } from "express";
import Todo from "../models/Todo";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: "Error creating todo" });
  }
});


router.get("/", async (_req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
});


router.put("/:id", async (req: Request, res: Response) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});


router.delete("/:id", async (req: Request, res: Response) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
