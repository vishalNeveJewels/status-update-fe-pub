/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Import sort icon
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Import sort icon
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const headerCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'vendorId',
    align: 'left',
    disablePadding: false,
    label: 'Vendor Id'
  },
  {
    id: 'vendorName',
    align: 'left',
    disablePadding: false,
    label: 'Vendor Name'
  },
  // {
  //   id: 'firstName',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'First Name'
  // },
  // {
  //   id: 'lastName',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Last Name'
  // },
  {
    id: 'Email',
    align: 'left',
    disablePadding: false,
    label: 'Email'
  }
];

export default function OrderTable({ rows, onClick, handleTableRowClick, handleSortingClick, orderBy, order }) {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedDataIdIs, setCopiedDataIdIs] = useState(null);

  return (
    <Box sx={{ position: 'relative' }}>
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
              {headerCells?.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  onClick={handleSortingClick}
                  sx={{ cursor: 'pointer' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '0.5rem'
                    }}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      order === 'DESC' ? (
                        <ArrowDownwardIcon fontSize="small" />
                      ) : (
                        <ArrowUpwardIcon fontSize="small" />
                      )
                    ) : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  tabIndex={-1}
                  key={row.TrackingNo}
                  onClick={() => {
                    handleTableRowClick(row?.vendorId);
                  }}
                >
                  <TableCell>{row?.id}</TableCell>
                  <TableCell>{row?.vendorId}</TableCell>
                  <TableCell>{row?.vendorName}</TableCell>
                  {/* <TableCell>{row?.user?.firstName}</TableCell>
                  <TableCell>{row?.user?.lastName}</TableCell> */}
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {row?.user?.email}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setCopiedDataIdIs(row?.id);
                      }}
                    >
                      <CopyToClipboard
                        text={row?.user?.email}
                        onCopy={() => {
                          setIsCopied(true);
                        }}
                      >
                        <Button sx={{ px: 3 }} variant="outlined" color="primary">
                          {isCopied && copiedDataIdIs === row?.id ? 'Copied' : 'Copy'}
                        </Button>
                      </CopyToClipboard>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'absolute', top: -50, right: 0 }}>
        <Button onClick={onClick} sx={{ px: 5 }} variant="contained" color="primary">
          Add vendor
        </Button>
      </Box>
    </Box>
  );
}

OrderTable.propTypes = {
  rows: PropTypes.array,
  onClick: PropTypes.func,
  handleTableRowClick: PropTypes.func,
  handleSortingClick: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string
};
