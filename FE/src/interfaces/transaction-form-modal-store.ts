import iCategory from './category';
import iPayment from './payment';
import { iTransaction } from './transaction';

export type iTransactionAddModalVisible = boolean;
export type iMessageVisible = boolean;
export interface iInput {
  _id?: '';
  year: number;
  month: number;
  day: number;
  type: string;
  category: iCategory;
  payment: iPayment;
  cost: number;
  content: string;
}
export type iMessage = string;

export type iInitInput = (value: void) => void;
export type iSetMessageVisible = (visible: boolean) => void;
export type iSetMessage = (text: string) => void;
export type iSetTransactionAddModalVisible = (visible: boolean) => void;
export type iSetInput = (transactionFormInput: iInput) => void;
export type iSubmitPost = (accounbookId: string) => Promise<iTransaction>;
export type iSubmitUpdate = (accountbookId: string) => Promise<iTransaction>;

export type OptionType = {
  value: string;
  label: string;
};
