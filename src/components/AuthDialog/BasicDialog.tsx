import { FC } from 'react';
import { Dialog } from '@mui/material';

import { BasicDialogProps } from './types';

export const BasicDialog: FC<BasicDialogProps> = ({ children, handleClose, isOpen }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        {children}
      </Dialog>
    </>
  );
};
