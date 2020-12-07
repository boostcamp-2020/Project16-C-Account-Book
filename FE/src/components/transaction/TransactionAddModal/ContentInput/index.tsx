import React, { ChangeEvent } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const ContentInput = () => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setInput({ ...input, content: targetElement.value });
    }
  };

  return (
    <div className="item memo__input">
      <div className="indicator">메모</div>
      <input
        type="text"
        name="memo"
        onChange={onContentChange}
        value={input.content}
      />
    </div>
  );
};

export default ContentInput;
