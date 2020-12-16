import { useState } from 'react';

const useSaveModal = () => {
  const [saveModal, setSaveModal] = useState(false);
  const [saveAction, setSaveAction] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const SaveModal = {
    saveModal,
    setSaveModal,
    saveAction,
    setSaveAction,
    updateData,
    setUpdateData,
    modalTitle,
    setModalTitle,
  };
  return SaveModal;
};

export default useSaveModal;
