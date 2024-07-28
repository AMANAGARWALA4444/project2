import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { toast } from 'react-toastify';

const Form = () => {

    const {addIncome, getIncomes} = useGlobalContext();

    const[input, setInput] = useState({
        title : '',
        amount : 0,
        date: null,
        category: '',
        description: '',
    })

    const {title, amount, date, category, description} = input;

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        if(title.trim() === '') 
        {
            toast.error("Please enter a title");
            return;
        }
        if(amount <= 0)
        {
            toast.error("Please enter a amount greater than zero");
            return;
        }
        if(!date)
        {
            toast.error("Please enter a date");
            return;
        }
        if(category.trim() === '') 
        {
            toast.error("Please enter a category");
            return;
        }
        if(description.trim() === '') 
        {
            toast.error("Please enter a description");
            return;
        }
        addIncome(input);
        setInput(
        {
            title : '',
            amount : 0,
            date : null,
            category: '',
            description: '',
        })
        getIncomes();
    }

    const handleInput = name => e => 
    {
        if (name === 'amount') 
        {
            setInput({...input, [name]: Number(e.target.value)});
        } 
        else 
        {
            setInput({...input, [name]: e.target.value});
        }
    };
    

    return (
        <FormStyled onSubmit = {handleSubmit}>
            <div className = "input-control">
                <input 
                    type = "text"
                    placeholder = "Income Title"
                    name = "title"
                    value = {title}
                    onChange = {handleInput('title')}
                />
            </div>
            <div className = "input-control">
                <input 
                    type = 'number'
                    placeholder = "Income Amount"
                    name = "amount"
                    value = {amount}
                    onChange = {handleInput('amount')}
                />
            </div>
            <div className = "input-control">
                <DatePicker 
                    id = 'date'
                    placeholderText = 'Enter A Date'
                    selected = {input.date}
                    dateFormat = "yyyy-MM-dd"
                    onChange={(date) => 
                    {
                        setInput({...input, date: date})
                    }}
                />
            </div>
            <div className = "input-control">
                <select 
                    required value = {category} 
                    name = "category" 
                    id = "category" 
                    onChange = {handleInput('category')}
                >
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className = "input-control">
                <textarea 
                    name = "description" 
                    value = {description} 
                    placeholder = 'Add A Reference' 
                    id = "description"  
                    cols = "30" 
                    rows = "4" 
                    onChange = {handleInput('description')}
                >
                </textarea>
            </div>
            <div className = "submit-btn">
                <Button 
                    name = {'Add Income'}
                    icon = {plus}
                    bPad = {'.8rem 1.6rem'}
                    bRad = {'30px'}
                    bg = {'var(--color-accent'}
                    color = {'#fff'}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`

export default Form