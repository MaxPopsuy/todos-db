const Todo = require("../models/Todo");

exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      next(new Error(`Todo with id ${id} not found`));
      return;
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};
exports.updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404);
    next(new Error(`Todo with id ${id} not found`));
    return;
  }
  try {
    const newTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(newTodo);
  } catch (error) {
    next(error);
  }
};
exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: `Todo with id ${id} not found` });
    return;
  }
  try {
    const deletedTodo = await Todo.findByIdAndRemove(id);
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
};
exports.updateTodoStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({ message: `Todo with id ${id} not found` });
    return;
  }
  try {
    todo.completed = req.body.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    next(error);
  }
};
