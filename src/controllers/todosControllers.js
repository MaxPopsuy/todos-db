const Todo = require("../db/todos");
exports.createTodo = async (req, res, next) => {
  try {
    const newTodo = await Todo.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    if (!todo) {
      res.status(404)
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
  const todo = await Todo.getTodoById(id);
  if (!todo) {
    res.status(404)
    next(new Error(`Todo with id ${id} not found`));
    return;
  }
  try {
    const newTodo = await Todo.updateTodo(id, req.body);
    res.json(newTodo);
  } catch (error) {
    next(error);
  }
};
exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.getTodoById(id);
  if (!todo) {
    res.status(404).json({ message: `Todo with id ${id} not found` });
    return;
  }
  try {
    await Todo.deleteTodo(id);
    res.json(`deleted todo with id ${id}`);
  } catch (error) {
    next(error);
  }
};
exports.updateTodoStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.params;
  const todo = await Todo.getTodoById(id);
  if (!todo) {
    res.status(404).json({ message: `Todo with id ${id} not found` });
    return;
  }
  try {
    const updatedTodo = await Todo.updateTodoCompleted(id, JSON.parse(status));
    console.log(req.body);
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
