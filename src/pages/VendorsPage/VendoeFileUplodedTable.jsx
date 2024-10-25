import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';

const headerCells = [
  {
    o_num: 'id',
    align: 'center',
    disablePadding: false,
    label: 'Order Number'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'Updated Standard Status'
  },
  {
    id: 'updatedStatus',
    align: 'center',
    disablePadding: false,
    label: 'Vendor Status'
  }
];

const VendoeFileUplodedTable = (props) => {
  const { data, statusMap } = props;

  return (
    <div>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headerCells?.map((headCell, index) => (
                <TableCell
                  key={index}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sx={{ cursor: 'pointer' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      columnGap: '0.5rem'
                    }}
                  >
                    {headCell.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell>{row?.o_num}</TableCell>
                  <TableCell>{row?.status}</TableCell>
                  <TableCell>{statusMap?.[row?.status]?.join(', ') || ''}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

VendoeFileUplodedTable.propTypes = {
  data: PropTypes.array
};

export default VendoeFileUplodedTable;
