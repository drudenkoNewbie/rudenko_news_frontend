import { FormEvent, useState } from 'react';
import {
  TextField,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createAuthRequested } from '../../redux/actions/authActions';
import { AuthUser } from '../../types';
import { createChangeModal } from '../../redux/actions/modalActions';
import Loader from '../Loader';

export const AuthForm = ({ modalType }: {modalType: string}) => {
  const { isAuthLoading } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleClose = () => dispatch(createChangeModal({ isOpen: false, modalType: '' }));

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const fields = [
    {
      label: 'Username',
      value: username,
      setValue: setUsername,
      errorText: errors.username,
      validation: (value: string) => value != '',
      errorMsg: 'Shouln\'t be empty'
    },
    {
      label: 'Email',
      value: email,
      setValue: setEmail,
      errorText: errors.email,
      validation: validateEmail,
      errorMsg: 'Wrong email'
    },
    {
      label: 'Password',
      type: 'password',
      value: password,
      setValue: setPassword,
      errorText: errors.password,
      validation: (value: string) => value != '',
      errorMsg: 'Shouln\'t be empty'
    }
  ];

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && email &&  password) {
      if(!errors.username && !errors.email && !errors.password) {
        const user: AuthUser = { username, email, password };
        dispatch(createAuthRequested(user));
      }
    } else setErrors({ username: 'Shouldn\'t be empty', email: 'Wrong email', password: 'Shouln\'t be empty' });
  };

  if (isAuthLoading) return <Loader />;

  return (
    <>
      <DialogTitle>{modalType}</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <DialogContentText>
          To {modalType} to this website, please enter your username, email and password here
          </DialogContentText>
          {fields.map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              type={field.type || 'text'}
              value={field.value}
              error={!!field.errorText}
              helperText={field.errorText}
              onChange={(e) => {
                field.setValue(e.target.value);
                if (!field.validation(e.target.value)) {
                  setErrors(prev => ({ ...prev, [field.label.toLowerCase()]: field.errorMsg }));
                } else {
                  setErrors(prev => ({ ...prev, [field.label.toLowerCase()]: '' }));
                }
              }}
              onBlur={(e) => {
                field.setValue(e.target.value);
                if (!field.validation(e.target.value)) {
                  setErrors(prev => ({ ...prev, [field.label.toLowerCase()]: field.errorMsg }));
                } else {
                  setErrors(prev => ({ ...prev, [field.label.toLowerCase()]: '' }));
                }
              }}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{modalType}</Button>
        </DialogActions>
      </form>
    </>

  );
};

