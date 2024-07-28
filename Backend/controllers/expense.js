const Expense = require('../models/ExpenseSchema')

module.exports.addExpense = async(req, res) =>
{
    try
    {
        const title = req.body.title;
        const amount = req.body.amount;
        const date = req.body.date;
        const category = req.body.category;
        const description = req.body.description;
        
        if(!title || !amount || !date || !category || !description)
        {
            return res.status(400).json({Error : "Field cannot be empty"});
        }

        if(typeof amount !== 'number')
        {
            return res.status(400).json({Error : "Amount shall be a number"});
        }

        if(amount <= 0)
        {
            return res.status(400).json({Error : "Amount shall be greater than zero"});
        }

        const newExpenseData = new Expense(
        {
            title : title,
            amount : amount,
            date : date,
            category : category,
            description : description
        });

        await newExpenseData.save();
        return res.status(201).json({message : "Expense Added"});
    }
    catch(error)
    {
        console.log("Error in adding expense");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}


module.exports.getExpenses = async (req, res) =>
{
    try
    {
        const expenses = await Expense.find().sort({createdAt : -1});
        return res.status(200).json(expenses);
    }
    catch(error)
    {
        console.log("Error in getting Expense");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}


module.exports.deleteExpense = async(req, res) =>
{
    try
    {
        const { id } = req.params;
        const expenseData = await Expense.findByIdAndDelete(id)
        if(!expenseData)
        {
            return res.status(404).json({Error : "Expense Data Not Found"});
        }

        return res.status(200).json({message : 'Expense Data Deleted'});
    }
    catch(error)
    {
        console.log("Error in deleting Expense");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}