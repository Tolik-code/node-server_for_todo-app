import {v4 as uuidv4} from "uuid";
import {sequelize} from "../utils/db.js";
import {DataTypes, Op, UUIDV4} from 'sequelize';

export const Todo = sequelize.define('Todo', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
    // allowNull defaults to true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
    // allowNull defaults to true
  },
}, {
  tableName: 'todos',
  updatedAt: false,
});

export const normilize = ({ id, title, completed }) => {
  return { id, title, completed };
}

export const getAll = async () => {
  return await Todo.findAll({
    order: ['created_at'],
  });
}

export const getById = async (todoId) => {
  return Todo.findByPk(todoId);
}

export const create = (title) => {
  return Todo.create({ title });
}

export const remove = (todoId) => {
  return Todo.destroy({
    where: { id: todoId }
  });
}

const isValidId = (id) => {
  const pattern = /^[0-9a-f\-]+$/;

  return pattern.test(id);
}

export const removeMany = async (ids) => {
  if (!ids.every(isValidId)) {
    throw new Error();
  }

  return Todo.destroy({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  });
}

export const update = async ({completed, title, id}) => {

  return Todo.update({ completed, title }, {
    where: { id }
  })
}

export const updateMany = async (todos) => {
  return sequelize.transaction(async (t) => {
    for (const {id, title, completed} of todos) {
      await Todo.update({ completed, title }, {
          where: { id },
          transaction: t,
        }
      )
    }
  });
}
