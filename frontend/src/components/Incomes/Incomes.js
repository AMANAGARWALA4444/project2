import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

const Income = () => 
{
    const {addIncome, getIncomes, incomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() =>
    {
        getIncomes();
    }, [])

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className = 'income-headline'>
                    <h1>Income</h1>
                </div>

                <div className = "total-income">
                    <h2>Total Income : <span> Rs {totalIncome()}</span></h2>
                </div>
                
                <div className = 'income-content'>
                    <div className = 'form-container'>
                        <Form/>
                        <br></br>
                        <div className = 'incomes'>
                            {incomes.map((income) =>
                            {
                                const {_id, title, amount, date, category, description} = income;
                                return <IncomeItem
                                    key = {_id}
                                    id = {_id} 
                                    title = {title} 
                                    description = {description} 
                                    amount = {amount} 
                                    date = {date} 
                                    category = {category} 
                                    indicatorColor = "var(--color-green)"
                                    deleteIncome = {deleteIncome}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
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
            color: var(--color-green);
        }
    }
`;

export default Income