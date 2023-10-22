

import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    
});


export const expenseModel = mongoose?.models?.expense || mongoose.model('expense',expenseSchema);