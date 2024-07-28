import React, { useState, createContext, useContext } from "react";

console.log(process.env.REACT_APP_BACKEND_KEY);
const baseURL = `${process.env.REACT_APP_BACKEND_KEY}/api/v1/`;

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // For income
    const addIncome = async (income) => {
        try {
            const response = await fetch(`${baseURL}add-income`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(income)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await getIncomes();
            console.log(await response.json());
        } catch (err) {
            console.log(err);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await fetch(`${baseURL}get-incomes`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setIncomes(sortedData);
            console.log(sortedData);
        } catch (error) {
            console.error('There was an error fetching the incomes!', error);
        }
    };

    const deleteIncome = async (id) => {
        try {
            const response = await fetch(`${baseURL}delete-income/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await getIncomes();
        } catch (error) {
            console.error('There was an error deleting the income!', error);
        }
    };

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // For expense
    const addExpense = async (expense) => {
        try {
            const response = await fetch(`${baseURL}add-expense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expense)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await getExpenses();
            console.log(await response.json());
        } catch (err) {
            console.log(err);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await fetch(`${baseURL}get-expenses`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setExpenses(sortedData);
            console.log(sortedData);
        } catch (error) {
            console.error('There was an error fetching the expenses!', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`${baseURL}delete-expense/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await getExpenses();
        } catch (error) {
            console.error('There was an error deleting the expense!', error);
        }
    };

    const totalExpense = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Calculate current balance
    const currentBalance = () => {
        return totalIncome() - totalExpense();
    };

    // Transactional history
    const transactionalHistory = () => {
        const newExpenses = expenses.map((e) => ({ ...e, amount: e.amount * -1 }));
        const history = [...incomes, ...newExpenses];
        history.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(history);
        return history;
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            totalIncome,
            deleteIncome,
            addExpense,
            getExpenses,
            expenses,
            totalExpense,
            deleteExpense,
            currentBalance,
            transactionalHistory
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
