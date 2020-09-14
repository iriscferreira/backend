import {Document} from 'mongoose';

export class Transaction extends Document{
    code: string;
    value: number;
    data: Date;
    cpf: string|Number;
    percentageCashback: number;
    valueCashback: number;
    status: string;
}
