import express from 'express';
import {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../Controllers/IncomesController.js';

const IncomesRouter = express.Router();

// Routes for incomes
IncomesRouter.get('/', getAllIncomes); // Get all incomes
IncomesRouter.get('/:id', getIncomeById); // Get a specific income by ID
IncomesRouter.post('/', createIncome); // Create a new income
IncomesRouter.put('/:id', updateIncome); // Update an existing income
IncomesRouter.delete('/:id', deleteIncome); // Delete an income

export default IncomesRouter;
