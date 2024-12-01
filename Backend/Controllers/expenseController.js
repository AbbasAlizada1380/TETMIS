import Expense from '../models/expense.js';

/**
 * Create a new expense
 */
export const createExpense = async (req, res) => {
  try {
    const { for: purpose, amount, person } = req.body;

    if (!purpose || !amount || !person) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newExpense = await Expense.create({
      for: purpose,
      amount,
      person,
    });

    res.status(201).json({
      message: 'Expense created successfully.',
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense.', error });
  }
};

/**
 * Get all expenses
 */
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses.', error });
  }
};

/**
 * Get a specific expense by ID
 */
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense.', error });
  }
};

/**
 * Update an expense by ID
 */
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { for: purpose, amount, person } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    expense.for = purpose || expense.for;
    expense.amount = amount || expense.amount;
    expense.person = person || expense.person;

    await expense.save();

    res.status(200).json({
      message: 'Expense updated successfully.',
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense.', error });
  }
};

/**
 * Delete an expense by ID
 */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }

    await expense.destroy();

    res.status(200).json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense.', error });
  }
};
