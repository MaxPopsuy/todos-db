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
    let { page } = req.query;
    if (!page) {
      page = 1;
    } else {
      page = +page;
    }

    const perPage = 2;

    const todos = await Todo.find(null, null, {
      limit: perPage,
      skip: (page - 1) * perPage,
    });
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
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
};

exports.updateTodoStatus = async (req, res, next) => {
  const { id } = req.params;
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

exports.addTagsToSet = async (req, res, next) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          tags: { $each: tags },
        },
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
exports.pushTags = async (req, res, next) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $push: {
          tags: { $each: tags },
        },
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
exports.popTags = async (req, res, next) => {
  const { id } = req.params;
  const { order } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $pop: {
          tags: order,
        },
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
exports.pullTags = async (req, res, next) => {
  const { id } = req.params;
  const { tags } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $pullAll: {
          tags,
        },
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
