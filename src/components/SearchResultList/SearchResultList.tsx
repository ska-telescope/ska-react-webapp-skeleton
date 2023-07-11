import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import ViewEBInfo from '../ViewEBInfo/ViewEBInfo';
import { Modal } from '@mui/material';
import ViewSBDInfo from '../ViewSBDInfo/ViewSBDInfo';
import moment from 'moment';

interface EntryFieldProps {
  searchType: string;
  data: any;
  search: any;
}

export interface EntryFieldPropsData {
  id: string;
  history: [
    {
      id: string;
      sbd_id: string;
      created_by: string;
      created_on: string;
    }
  ];
}
export interface EntryFieldPropsDataHistory {
  id: string;
  sbd_id: string;
  created_by: string;
  created_on: string;
}

function createData(id: string) {
  return {
    id,
    history: [
      {
        id: 'eb-t0001-20230518-00001aaa',
        sbd_id: 'sbd-t0001-20230518-00001',
        created_by: 'DefaultUser',
        created_on: '2023-05-18 06:43:50.991066'
      }
    ]
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const changeValue = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={changeValue}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                View Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Eb Id</TableCell>
                    <TableCell>Sbd Id</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Created by</TableCell>
                    <TableCell>Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow: EntryFieldPropsDataHistory) => (
                    <TableRow key={historyRow.id}>
                      <TableCell>{historyRow.id}</TableCell>
                      <TableCell>
                        {/* {historyRow.sbd_id} */}
                        <ViewSBDInfo sbId={historyRow.sbd_id} />
                      </TableCell>
                      {/* <TableCell  sx={{ cursor: 'pointer', color: "blue", textDecoration: "underline" }}>{historyRow.sbd_id}</TableCell> */}
                      <TableCell> {moment(historyRow.created_on).format('DD-MM-YYYY')}</TableCell>
                      <TableCell>{historyRow.created_by}</TableCell>
                      <TableCell>
                        <ViewEBInfo />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = (props: EntryFieldProps) => {
  console.log('propspropsprops data', props);
  const rows = props.data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> {props.search}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
