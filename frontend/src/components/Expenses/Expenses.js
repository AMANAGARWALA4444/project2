import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from '../Form/ExpenseForm';
import ExpenseItem from '../ExpenseItem/ExpenseItem';



const Expense = () => 
{
    const {addExpense, getExpenses, expenses, deleteExpense, totalExpense } = useGlobalContext();
    
    useEffect(() =>
    {
        getExpenses();
    }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className = 'expense-headline'>
                    <h1>Expense</h1>
                </div>

                <div className = "total-expense">
                    <h2>Total Expense : <span> Rs {totalExpense()}</span></h2>
                </div>
                
                <div className = 'expense-content'>
                    <div className = 'form-container'>
                        <ExpenseForm />
                        <br></br>
                        <div className = 'expenses'>
                            {expenses.map((expense) =>
                            {
                                const {_id, title, amount, date, category, description, type} = expense;
                                return <ExpenseItem
                                    key = {_id}
                                    id = {_id} 
                                    title = {title} 
                                    description = {description} 
                                    amount = {amount} 
                                    date = {date} 
                                    type = {type}
                                    category = {category} 
                                    indicatorColor = "var(--color-red)"
                                    deleteExpense = {deleteExpense}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }
`;

export default Expense;