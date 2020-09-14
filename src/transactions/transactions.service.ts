import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
        private userService: UsersService,
    ) { }

    async getAll() {
        return await this.transactionModel.find().exec();
    }

    async getById(id: string) {

        try {

            return await this.transactionModel.findById(id).exec();

        } catch (error) {
            return error
        }


    }


    async getCashback(cpf: string) {

        let params = {
            cpf: this.formatCPF(cpf)
        }

        let url = `${process.env.API_EXTERNAL}?cpf=${cpf}`;

        const headers ={headers: {'token': process.env.API_EXTERNAL_TOKEN}};
            
        return await axios.get(url, headers   
        ).then((res) => {
            return res.data;
      }).catch((erro) =>{return erro}
      )

    }


    async create(transaction: Transaction) {

        const { code, value, data, cpf } = transaction;


        if (code === undefined || code === null)
            throw ({ message: "Por favor, inserir nome completo do revedendor(a)." })

        if (value === undefined || value === null)
            throw ({ message: "Por favor, inserir CPF do revedendor(a)." })

        if (data === undefined || data === null)
            throw ({ message: "Por favor, inserir email do revedendor(a)." })

        if (cpf === undefined || cpf === null)
            throw ({ message: "Por favor, inserir a senha de acesso do revedendor(a)." })

        let formattedCPF = this.formatCPF(cpf);

        if (formattedCPF === 15350946056) {
            transaction.status = "Aprovado";
        }

        const createTransaction = new this.transactionModel(transaction);

        this.calculateCashback(createTransaction);

        var transactionStored = await createTransaction.save();

        this.insertTransactionOnUser(formattedCPF, transactionStored);

        return transactionStored
    }

    async update(id: string, transaction: Transaction) {
        await this.transactionModel.updateOne({ _id: id }, transaction).exec();
        return this.getById(id);

    }

    async delete(id: string) {
        return await this.transactionModel.deleteOne({ _id: id }).exec();

    }

    formatCPF(cpf) {
        cpf = cpf.trim();
        try {
            if (cpf.length == 14)
                cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

            if (cpf.length == 11){
                return parseInt(cpf);
            }

            throw ({ "message": "CPF informado é inválido!" })
        } catch (error) {
            throw ({ "message": "CPF informado é inválido!" })
        }
    }

    calculateCashback(createTransaction) {
        let value = 0;

        value = createTransaction.value;

        if (value < 1000) {
            createTransaction.percentageCashback = 0.1;
            createTransaction.valueCashback = value * 0.1;
            return createTransaction;
        } else if (value => 1000 && value < 1500) {
            createTransaction.percentageCashback = 0.15;
            createTransaction.valueCashback = value * 0.15;
            return createTransaction;
        } else {
            createTransaction.percentageCashback = 0.2;
            createTransaction.valueCashback = value * 0.2;
            return createTransaction;
        }
    }

    async insertTransactionOnUser(cpf, transactionStored) {
        const user = await this.userService.getByCPF(cpf);

        if (!user)
            throw ({ "message": "Revendedor não encontrado" })

        user.transactions.push(transactionStored);

        await this.userService.update(user.id, user);
    }
}
