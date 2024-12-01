import express from 'express';
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from '../Controllers/expenseController.js';

const expenseRouter = express.Router();

expenseRouter.post('/', createExpense);
expenseRouter.get('/', getAllExpenses);
expenseRouter.get('/:id', getExpenseById);
expenseRouter.put('/:id', updateExpense);
expenseRouter.delete('/:id', deleteExpense);

export default expenseRouter;
