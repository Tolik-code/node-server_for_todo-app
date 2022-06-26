import express from 'express';
import * as todoControllers from "../controllers/todos.js";

export const router = express.Router();

router.get('/', todoControllers.getAll)

router.delete('/:todoId', todoControllers.remove)

router.get('/:todoId', todoControllers.getOne)

router.post('/', todoControllers.create)

const hasAction = (action) => {
  return (req, res, next) => {
    if (req.query.actions === action) {
      next();
    } else {
      next('route');
    }
  }
}

router.patch('/', hasAction('delete'), todoControllers.removeMany)

router.patch('/', hasAction('update'), todoControllers.updateMany)

router.patch('/:todoId', express.json(), todoControllers.update)