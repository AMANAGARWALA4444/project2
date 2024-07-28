const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
    {
        title :
        {
            type : String,
            required : true,
            trim : true,
            maxlength : 50
        },
        amount : 
        {
            type : Number,
            required : true
        },
        type :
        {
            type : String,
            default : "Expense"
        },
        date :
        {
            type : Date,
            required : true,
        },
        category :
        {
            type : String,
            required : true,
            trim : true
        },
        description :
        {
            type : String,
            required : true,
            trim : true,
            maxlength : 500
        }
    },
    {
        timestamps : true,
    }
);

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;