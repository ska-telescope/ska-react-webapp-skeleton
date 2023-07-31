import Box from '@mui/material/Box';
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
import { DATA_API_URL } from '../../utils/constants';

interface EntryFieldProps {
  info?: any;
  sbdId?: string;
}

const ViewSBDInfo = (props: EntryFieldProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [data, getData] = React.useState('');
  const handleClose = () => setOpen(false);

  if (props.info) {
    getData(props.info);
    setOpen(true);
  }

  const getDetailsById = async (searchFor, id) => {
    try {
      const baseURL = `${DATA_API_URL}/api/v1/${searchFor}/${id}`;
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      getData(result);
      setOpen(true);
    } catch (err) {
    } finally {
    }
  };

  return (
    <div>
      <Box sx={{ p: 1 }}>
        {props.sbdId && props.sbdId !== '' && (
          <p
            style={{ cursor: 'pointer', color: '#070068' }}
            onClick={() => getDetailsById('sbds', props.sbdId)}
          >
            {props.sbdId}
          </p>
        )}
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{' Scheduling block Info'}</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(data, null, 1)}</pre>
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

export default ViewSBDInfo;
