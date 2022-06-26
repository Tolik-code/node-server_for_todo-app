import * as todoServices from "../services/todos.js";
import {normilize} from "../services/todos.js";

export const getAll = async (req, res) => {
  const todos = await todoServices.getAll();

  res.send(todos.map(todo => todoServices.normilize(todo)));
}

export const getOne = async (req, res) => {
  const { todoId } = req.params;
  const foundTodo = await todoServices.getAll(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  res.send(todoServices.normilize(foundTodo));
}

export const remove = async (req, res) => {
  const todos = await todoServices.getAll();
  const { todoId } = req.params;

  await todoServices.remove(todoId);

  res.send({data: todos.map(todo => todoServices.normilize(todo))});
}

export const create = async (req, res) => {
  const {title} = req.body;

  if (!title) {
    res.sendStatus(422);
    return;
  }

  const newTodo = await todoServices.create(title);

  res.statusCode = 201;
  res.send({ data: todoServices.normilize(newTodo) });
}

export const removeMany = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  await todoServices.removeMany(ids)

  res.sendStatus(204);
}

export const updateMany = async (req, res) => {
  const todos = await todoServices.getAll();
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }

  await todoServices.updateMany(items);

  res.send(todos.map(todo => todoServices.normilize(todo)));
  res.sendStatus(200);
}

export const update = async (req, res) => {
  const {todoId} = req.params;
  const { completed, title } = req.body
  const foundTodo = await todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  await todoServices.update({completed, title, id: todoId});
  const updatedTodo = await todoServices.getById(todoId);

  res.statusCode = 200;
  res.send({data: todoServices.normilize(updatedTodo)});
}