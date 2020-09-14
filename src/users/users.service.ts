import { User } from './user';
import { Transaction } from '../transactions/transaction';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>
    ) { }

  async getAll() {
    return await this.userModel.find()
    // .select("transactions")
    .populate('Transaction')
    .exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async getByCPF(cpf: number) {
    return await this.userModel.findOne({ cpf }).exec();
  }

  async create(user: User) {
    const { fullname, cpf, email, password } = user; 

    if(fullname === undefined || fullname === null )
    throw({message: "Por favor, inserir nome completo do revedendor(a)."})

    if(cpf === undefined  || cpf === null )
    throw({message: "Por favor, inserir CPF do revedendor(a)."})

    if(email === undefined || email === null )
    throw({message: "Por favor, inserir email do revedendor(a)."})

    if(password === undefined ||  password === null)
    throw({message: "Por favor, inserir a senha de acesso do revedendor(a)."})   


    let validCPF = this.formatCPF(cpf);

    user.cpf = validCPF;

    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();

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

}
