const Income = require('../models/IncomeSchema')

module.exports.addIncome = async(req, res) =>
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

        const newIncomeData = new Income(
        {
            title : title,
            amount : amount,
            date : date,
            category : category,
            description : description
        });

        await newIncomeData.save();
        return res.status(201).json({message : "Income Added"});
    }
    catch(error)
    {
        console.log("Error in adding income");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}


module.exports.getIncomes = async (req, res) =>
{
    try
    {
        const incomes = await Income.find().sort({createdAt : -1});
        return res.status(200).json(incomes);
    }
    catch(error)
    {
        console.log("Error in getting income");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}


module.exports.deleteIncome = async(req, res) =>
{
    try
    {
        const { id } = req.params;
        const incomeData = await Income.findByIdAndDelete(id)
        if(!incomeData)
        {
            return res.status(404).json({Error : "Income Data Not Found"});
        }

        return res.status(200).json({message : 'Income Data Deleted'});
    }
    catch(error)
    {
        console.log("Error in deleting income");
        console.log(error.message);
        return res.status(500).json({Error : "Server Error"});
    }
}