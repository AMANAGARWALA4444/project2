import React, { useState, createContext, useContext } from "react";
import axios from "axios";

// const baseURL = "http://localhost:5000/api/v1/";
const baseURL= `${process.env.REACT_BACKEND_KEY}/api/v1/`

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => 
{
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    //for income
    const addIncome = (income) => 
    {
        axios.post(`${baseURL}add-income`, income)
            .then((response) => 
            {
                getIncomes();
                console.log(response);
                return response;
            })
            .catch((err) => 
            {
                console.log(err);
            });
        getIncomes();
    };

    const getIncomes = () => 
    {
        axios.get(`${baseURL}get-incomes`)
            .then(response => 
            {
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setIncomes(sortedData);
                console.log(sortedData);
            })
            .catch(error => 
            {
                console.error('There was an error fetching the incomes!', error);
            });
    };
    
    
    const deleteIncome = (id) => 
    {
        axios.delete(`${baseURL}delete-income/${id}`)
            .then(res => 
            {
                getIncomes();
            })
            .catch(error => 
            {
                console.error('There was an error deleting the income!', error);
            });
        getIncomes();
    };


    const totalIncome = () => 
    {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }
    
    //for expense
    const addExpense = (expense) => 
    {
        axios.post(`${baseURL}add-expense`, expense)
            .then((response) => 
            {
                getExpenses();
                console.log(response);
                return response;
            })
            .catch((err) => 
            {
                console.log(err);
            });
        getExpenses();
    };
    
    const getExpenses = () => 
    {
        axios.get(`${baseURL}get-expenses`)
            .then(response => 
            {
                const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sortedData);
                console.log(sortedData);
            })
            .catch(error => 
            {
                console.error('There was an error fetching the expenses!', error);
            });
    };
        
        
    const deleteExpense = (id) => 
    {
        axios.delete(`${baseURL}delete-expense/${id}`)
            .then(res => 
            {
                getExpenses();
            })
            .catch(error => 
            {
                console.error('There was an error deleting the expense!', error);
            });
        getExpenses();
    };


    const totalExpense = () => 
    {
        let totalExpense = 0;
        expenses.forEach((expense) =>
        {
            totalExpense = totalExpense + expense.amount
        })
        return totalExpense;
    }

    //calculate current balance
    const currentBalance = () =>
    {
        return totalIncome() - totalExpense();
    }

    //transactions
    const transactionalHistory = () =>
    {
        const newExpenses = expenses.map((e) => ({...e, amount : e.amount * -1}));
        const history = [...incomes, ...newExpenses]

        history.sort((a, b) => new Date(b.date) - new Date(a.date))
        console.log(history);
        return history;
    }

    return (
        <GlobalContext.Provider value = {{ 
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
            transactionalHistory }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => 
{
    return useContext(GlobalContext);
};
