import * as mongoose from 'mongoose';
import { isEmpty, isBoolean } from 'class-validator';
import { Schema } from '@nestjs/mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: String,
  cpf: Number,
  email: String,
  password: String,
  transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
});
