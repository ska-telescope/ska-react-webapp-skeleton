import PreviewIcon from '@mui/icons-material/Preview';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';

interface EntryFieldProps {
  info: string;
}

const ViewSBD = (props: EntryFieldProps) => {
  const infoData = props.info;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <PreviewIcon style={{ cursor: 'pointer' }} onClick={handleOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{' Scheduling block Info'}</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(infoData, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSBD;
