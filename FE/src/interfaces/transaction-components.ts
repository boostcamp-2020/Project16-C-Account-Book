import { iTransaction } from '@interfaces/transaction';
import { Dispatch, SetStateAction } from 'react';

// ListContainer

// Transactions
export type iDraggedItem = iTransaction;
export type iSetDraggedItem = Dispatch<SetStateAction<iDraggedItem>>;
export type iDraggedInDate = string;
export type iSetDraggedInDate = Dispatch<SetStateAction<iDraggedInDate>>;

// Transactions Filter
export type iSelectedCategories = string[];
export type iSelectCategories = Dispatch<SetStateAction<iSelectedCategories>>;
export type iSelectedTypes = string[];
export type iSelectType = Dispatch<SetStateAction<iSelectedTypes>>;

export interface iFilterProps {
  selectedCategories: iSelectedCategories;
  selectCategories: iSelectCategories;
  selectedTypes: iSelectedTypes;
  selectType: iSelectType;
}

// TransactionOfOneDay

export interface iTransactionOfOneDayProp {
  draggedItem: iDraggedItem;
  setDraggedItem: iSetDraggedItem;
  draggedInDate: iDraggedInDate;
  setDraggedInDate: iSetDraggedInDate;
  date: string;
  transactions: iTransaction[];
}

// TransactionItem
export interface iTransactionItemProp {
  setDraggedItem?: iSetDraggedItem;
  dragObject?: boolean;
  setDraggedInDate?: iSetDraggedInDate;
}
