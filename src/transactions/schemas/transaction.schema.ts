import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    code: String,
    value: Number,
    data: Date,
    percentageCashback: Number,
    valueCashback: Number,
    status: {type: String, default: "Em validação" }
})
