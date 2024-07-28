const express = require('express');

const incomeControllers = require('../controllers/income');
const expenseControllers = require('../controllers/expense');

const router = express.Router();

router.post('/add-income', incomeControllers.addIncome);
router.get('/get-incomes', incomeControllers.getIncomes);
router.delete('/delete-income/:id', incomeControllers.deleteIncome);

router.post('/add-expense', expenseControllers.addExpense);
router.get('/get-expenses', expenseControllers.getExpenses);
router.delete('/delete-expense/:id', expenseControllers.deleteExpense);

module.exports = router;