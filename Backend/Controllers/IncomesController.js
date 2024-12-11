import Incomes from '../models/income.js';

// Get all incomes
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Incomes.findAll();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve incomes.', error });
  }
};

// Get a single income by ID
export const getIncomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Incomes.findByPk(id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found.' });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve income.', error });
  }
};

// Create a new income
export const createIncome = async (req, res) => {
  const { source, amount, takingDate } = req.body;
  try {
    const newIncome = await Incomes.create({ source, amount, takingDate });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create income.', error });
  }
};

// Update an existing income
export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { source, amount, takingDate } = req.body;
  try {
    const income = await Incomes.findByPk(id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found.' });
    }
    await income.update({ source, amount, takingDate });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update income.', error });
  }
};

// Delete an income
export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Incomes.findByPk(id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found.' });
    }
    await income.destroy();
    res.status(200).json({ message: 'Income deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete income.', error });
  }
};
