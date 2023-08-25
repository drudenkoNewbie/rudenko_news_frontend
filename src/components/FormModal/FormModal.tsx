import { Dialog } from '@mui/material';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createChangeModal } from '../../redux/actions/modalActions';
import { AuthForm } from '../AuthForm/AuthForm';
import Loader from '../Loader';

export const FormModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const { isAuthLoading, authError } = useAppSelector(state => state.auth);
  const handleClose = () => dispatch(createChangeModal({ isOpen: false, modalType: '' }));
  const [isErrorBlock, setIsErrorBlock] = useState(true);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        {!isAuthLoading && !isErrorBlock && <AuthForm modalType={modalType} />}
        {isAuthLoading && <Loader />}
        {authError && isErrorBlock && <button onClick={() => setIsErrorBlock(false)}>Auth Error</button>}
      </Dialog>
    </>
  );
};
