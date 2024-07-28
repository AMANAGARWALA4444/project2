import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { useGlobalContext } from '../../context/globalContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() 
{
    const {transactionalHistory} = useGlobalContext();

    const [...history] = transactionalHistory();

    const historyReverse = history.reverse();

    let newHistory = [];

    historyReverse.map((ele1) =>
    {
        var found = 0;
        newHistory.map((ele2) =>
        {
            if(dateFormat(ele1.date) === ele2.date)
            {
                console.log("yes");
                if(ele1.amount > 0)
                {
                    ele2.income = ele2.income + ele1.amount
                    found = 1;
                }
                else if(ele1.amount < 0)
                {
                    ele2.expense = ele2.expense + ele1.amount * -1
                    found = 1;
                }
            }
        })
        if(found === 0)
        {
            if(ele1.amount > 0)
            {
                newHistory = [...newHistory, {"date" : dateFormat(ele1.date), "income" : ele1.amount, "expense" : 0}]
            }
            else
            {
                newHistory = [...newHistory, {"date" : dateFormat(ele1.date), "income" : 0, "expense" : ele1.amount * -1}]
            }
        }
    })

    console.log(newHistory);
    const data = 
    {
        labels: newHistory.map((element) =>
        {
            return element.date
        }),
        datasets: 
        [
            {
                label: 'Income',
                data: 
                [
                    ...newHistory.map((data) =>
                    {
                        return data.income
                    })
        
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expense',
                data: 
                [
                    ...newHistory.map((data) =>
                    {
                        return data.expense
                    })
        
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart