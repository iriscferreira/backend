import { Document } from 'mongoose';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import {Transaction} from '../transactions/transaction';

export class User extends Document {
  fullname: string;
  @ValidateIf(o => o.cpf)
  cpf: Number;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  transactions: Array<Transaction>
}


