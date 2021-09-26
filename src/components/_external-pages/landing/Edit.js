import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  CardHeader,
  Card,
  Typography,
  CardContent
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import { UploadAvatar } from '../../upload';
//
Edit.propTypes = {
  editId: PropTypes.number,
  editTitle: PropTypes.string,
  editContent: PropTypes.string,
  editImage: PropTypes.string,
  onEdit: PropTypes.func
};
export default function Edit({ editId, editTitle, editContent, editImage, onEdit }) {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(editImage);
  const [eTitle, setEtitle] = useState('');
  const [eContent, setEcontent] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setEtitle(editTitle);
    setEcontent(editContent);
  }, [editTitle, editContent]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    const updateData = {
      uId: editId,
      utitle: eTitle,
      ucontent: eContent,
      uimage: avatarUrl
    };
    enqueueSnackbar('Save success', { variant: 'success' });
    onEdit(updateData);
    setOpen(false);
  };
  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update Every fields.</DialogContentText>
          <TextField
            size="small"
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Title"
            value={eTitle}
            onChange={(e) => {
              setEtitle(e.target.value);
            }}
          />
          <TextField
            size="small"
            fullWidth
            multiline
            rows={5}
            type="text"
            margin="dense"
            variant="outlined"
            label="Content"
            value={eContent}
            onChange={(e) => {
              setEcontent(e.target.value);
            }}
          />
          <Card>
            <CardHeader title="Upload Image" />
            <CardContent>
              <UploadAvatar
                accept="image/*"
                file={avatarUrl}
                onDrop={handleDropAvatar}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of 3.1MB
                  </Typography>
                }
              />
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
