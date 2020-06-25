import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Create {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface All {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): All {
    const balance = this.getBalance();

    const transactions = this.transactions;
    
    const allTransactionsAndBalance = {
      transactions,
      balance,
    }

    return allTransactionsAndBalance;
  }

  public getBalance(): Balance {

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, value) => value.value + total, 0);

      const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, value) => value.value + total, 0);

      const total = income - outcome;

      const balance: Balance = {
        income,
        outcome,
        total,
      }
      
      return balance;
  }

  public create({title,type, value}: Create): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction)

    return transaction;
  }
}

export default TransactionsRepository;
