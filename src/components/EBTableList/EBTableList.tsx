import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import ViewEBInfo from '../ViewEBInfo/ViewEBInfo';

interface EntryFieldProps {
  searchType: string;
  data: any;
  search: any;
}
interface Column {
  id: string;
  label: string;
}

const columns: readonly Column[] = [
  { id: 'eb_id', label: 'EB Id' },
  { id: 'version', label: 'Version' },
  { id: 'created_on', label: 'Created on' },
  { id: 'created_by', label: 'Created by' },
  { id: 'info', label: 'More info' }
];
const EBTableList = (props: EntryFieldProps) => {
  const rowData = props.data;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.metadata.metadata.version}</TableCell>
                  <TableCell>
                    {moment(row.metadata.metadata.created_on).format('DD-MM-YYYY')}
                  </TableCell>
                  <TableCell>{row.metadata.metadata.created_by}</TableCell>
                  <TableCell>
                    <ViewEBInfo info={row.metadata.request_responses} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EBTableList;
