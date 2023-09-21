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

import useTextInput from '../../hooks/useTextInput';
import useFileInput from '../../hooks/useFileInput';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { createAddPostRequested } from '../../redux/actions/addPostActions';
import { CANCEL, SUBMIT } from '../../locales/en.json';
import { SHAKE_INPUT_DURATION } from '../../constants';
import { FileField } from '../FileField';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';
import {
  titleSchema,
  contentSchema,
  tagsSchema,
  imageSchema
} from './constants';

export const AddPostForm: FC<{ handleClose: () => void }> = ({
  handleClose
}) => {
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const dispatch = useAppDispatch();

  const imageInputProps = useFileInput(imageSchema);
  const titleInputProps = useTextInput(titleSchema);
  const contentInputProps = useTextInput(contentSchema);
  const tagsInputProps = useTextInput(tagsSchema);

  useEffect(() => {
    if (submitAttempt > 0) {
      const timer = setTimeout(() => setSubmitAttempt(0), SHAKE_INPUT_DURATION);

      return () => clearTimeout(timer);
    }
  }, [submitAttempt]);

  const formData = {
    title: titleInputProps.value,
    content: contentInputProps.value,
    tagValues: tagsInputProps.value,
    image: imageInputProps.file
  };

  const formError =
    titleInputProps.error ||
    contentInputProps.error ||
    tagsInputProps.error ||
    imageInputProps.error ||
    Object.values(formData).some((v) => v != null && v === '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitAttempt((attempts) => attempts + 1);

    if (!formError) {
      dispatch(
        createAddPostRequested({
          ...formData,
          tagValues: formData.tagValues.split(/[ ,]+/)
        })
      );
    }
  };

  return (
    <Box>
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <DialogContentText>You can write your thoughts here</DialogContentText>
      </DialogContent>
      <form onSubmit={handleSubmit}>
        <Box sx={sxMargin10}>
          <FileField
            component="post"
            {...imageInputProps}
            ref={imageInputProps.inputRef}
          />
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
          <Button name="submit" type="submit" disabled={formError}>
            {SUBMIT}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};
