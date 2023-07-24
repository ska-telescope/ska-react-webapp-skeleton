import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PreviewIcon from '@mui/icons-material/Preview';
import { Card } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  height: '550px'
};

interface EntryFieldProps {
  info: any;
}

const ViewSBDInfo = (props: EntryFieldProps) => {
  const infoData = props.info;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <PreviewIcon style={{ cursor: 'pointer' }} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Detail Scheduling block Info:
          </Typography>
          <Card sx={{ mt: 2, p: 2 }}>
            <pre>{JSON.stringify(infoData, null, 1)}</pre>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewSBDInfo;
