import { FormEvent, FC, useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';

import { CANCEL, SUBMIT } from '../../locales/en.json';
import useInput from '../../hooks/useInput';
import { InputProps } from '../../types';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { createAddPostRequested } from '../../redux/actions/addPostActions';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';

export const AddPostForm: FC<{ handleClose: () => void }> = ({
  handleClose
}) => {
  const ANIMATION_DURATION = 300;
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const dispatch = useAppDispatch();

  const titleSchema: InputProps = {
    name: 'title',
    required: true
  };

  const contentSchema: InputProps = {
    name: 'content',
    required: true
  };

  const tagsSchema: InputProps = {
    name: 'tags',
    required: true
  };

  const titleInputProps = useInput(titleSchema);
  const contentInputProps = useInput(contentSchema);
  const tagsInputProps = useInput(tagsSchema);

  useEffect(() => {
    if (submitAttempt > 0) {
      const timer = setTimeout(() => setSubmitAttempt(0), ANIMATION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [submitAttempt]);

  const formData = {
    title: titleInputProps.value,
    content: contentInputProps.value,
    tags: tagsInputProps.value
  };

  const formError =
    titleInputProps.error || contentInputProps.error || tagsInputProps.error;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitAttempt((attempts) => attempts + 1);

    if (!formError) {
      const dataForSending = {
        title: formData.title,
        content: formData.content,
        tagValues: formData.tags.split(/[ ,]+/)
      };

      dispatch(createAddPostRequested(dataForSending));
    }
  };

  return (
    <Box>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>You can edit your profile here</DialogContentText>
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Box sx={sxMargin10}>
          <TextField
            {...titleInputProps}
            sx={
              titleInputProps.error && submitAttempt > 0 ? shakeAnimation : {}
            }
            margin="dense"
            fullWidth
          />
          <TextField
            {...contentInputProps}
            sx={
              contentInputProps.error && submitAttempt > 0 ? shakeAnimation : {}
            }
            margin="dense"
            fullWidth
          />
          <TextField
            {...tagsInputProps}
            sx={tagsInputProps.error && submitAttempt > 0 ? shakeAnimation : {}}
            margin="dense"
            fullWidth
          />
        </Box>
        <DialogActions sx={sxJustifyCenter}>
          <Button name="cancel" onClick={handleClose}>
            {CANCEL}
          </Button>
          <Button name="submit" type="submit">
            {SUBMIT}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};
