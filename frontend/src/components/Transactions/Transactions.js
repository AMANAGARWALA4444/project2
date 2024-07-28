import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import TransactionItem from '../TransactionItem/TransactionItem';
import { dateFormat } from '../../utils/dateFormat';

const Transactions = () =>
{
    const { transactionalHistory } = useGlobalContext();

    const [...history] = transactionalHistory();


    return(
        <TransactionsStyled>
            <InnerLayout>
                <div className = 'Transaction-headline'> 
                    <h1> Recent Transactions </h1>
                </div>
                <div className = 'transactions-orderwise'>
                    {history.map((item) =>
                    {
                        const {_id, title, amount, date, category, description, type} = item
                        return(
                            <TransactionItem
                                key = {_id}
                                id = {_id}
                                title = {title}
                                amount = {amount}
                                date = {date}
                                type = {type}
                                category = {category} 
                                description = {description}
                                indicatorColor = {amount > 0 ? "var(--color-green)" : "var(--color-red)"}
                            />
                        )
                    })}
                </div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
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
            color: var(--color-green);
        }
    }
`;

export default Transactions