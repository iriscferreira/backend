import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';

describe('Transactions', () => {
  let provider: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService],
    }).compile();

    provider = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
