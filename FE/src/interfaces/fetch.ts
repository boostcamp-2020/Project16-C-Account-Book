import iAccountbook from './accountbook';
import { iTransaction } from './transaction';

interface iResponse {
  message: string;
  status: number;
}

export interface iMonthAccountbookResponse extends iResponse {
  data: iAccountbook | null;
}

export interface iTransactionResponse extends iResponse {
  data: iTransaction | null;
}
