import { forwardRef } from 'react';
import { Avatar, TextField } from '@mui/material';

import { input, postPreview } from './styles';
import { sxAvatar } from './sxStyles';
import { FileFieldProps } from './types';

const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
  (
    {
      previewSrc,
      fileName,
      helperText,
      error,
      accept,
      autoComplete,
      component,
      handlePreviewClick,
      handleFileChange,
      handleInputBlur
    },
    inputRef
  ) => {
    return (
      <>
        {component === 'avatar' && (
          <Avatar src={previewSrc} sx={sxAvatar} onClick={handlePreviewClick} />
        )}
        {component === 'post' && (
          <img
            src={previewSrc}
            style={postPreview}
            onClick={handlePreviewClick}
          />
        )}
        <input
          ref={inputRef}
          style={input}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          autoComplete={autoComplete}
          onBlur={handleInputBlur}
        />
        <TextField
          fullWidth
          margin="dense"
          value={fileName}
          helperText={helperText}
          error={error}
          disabled
        />
      </>
    );
  }
);

export default FileField;
