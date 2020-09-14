import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import {TransactionSchema } from './schemas/transaction.schema';

import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        UsersModule, 
        MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema}])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
