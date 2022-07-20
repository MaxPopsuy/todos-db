const express = require("express");
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  addTagsToSet,
  pushTags,
  popTags,
  pullTags,
} = require("../controllers/todosControllers");
const router = express.Router();
const schemaValidate = require("../middlewares/schemaValidate");
const todosValidators = require("../validations/todos");

// router.post("/", schemaValidate(todosValidators.createOrUpdate), createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.put("/:id", schemaValidate(todosValidators.createOrUpdate), updateTodo);
router.delete("/:id", deleteTodo);
router.patch(
  "/:id/:status",
  schemaValidate(todosValidators.updateStatus),
  updateTodoStatus
);
router.patch("/:id/tags/addToSet", addTagsToSet);
router.patch("/:id/tags/push", pushTags);
router.patch("/:id/tags/pop", popTags);
router.patch("/:id/tags/pullAll", pullTags);

module.exports = router;
