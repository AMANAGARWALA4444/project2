const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema(
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
            default : "Income"
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

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;