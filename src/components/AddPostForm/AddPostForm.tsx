import {
  FormEvent,
  type FC,
  useState,
  useEffect
} from 'react';
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
import {
  CANCEL,
  SUBMIT,
  ADD_POST,
  YOU_CAN_WRITE_YOUR_THOUGHTS_HERE
} from '../../locales/en.json';
import { SHAKE_INPUT_DURATION, BUTTON_NAMES } from '../../constants';
import { FileField } from '../FileField';

import { shakeAnimation, sxJustifyCenter, sxMargin10 } from './sxStyles';
import {
  titleSchema,
  contentSchema,
  tagsSchema,
  imageSchema,
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
    titleInputProps.error
    || contentInputProps.error
    || tagsInputProps.error
    || imageInputProps.error
    || Object.values(formData).some((v) => v != null && v === '');

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
      <DialogTitle>{ADD_POST}</DialogTitle>
      <DialogContent>
        <DialogContentText>{YOU_CAN_WRITE_YOUR_THOUGHTS_HERE}</DialogContentText>
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
          <Button name={BUTTON_NAMES.CANCEL} onClick={handleClose}>
            {CANCEL}
          </Button>
          <Button name={BUTTON_NAMES.SUBMIT} type="submit" disabled={formError}>
            {SUBMIT}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
};
