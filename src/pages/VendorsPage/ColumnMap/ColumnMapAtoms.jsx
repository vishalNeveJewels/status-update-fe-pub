import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Box, Grid, TextField } from '@mui/material';

const ColumnMapAtoms = (props) => {
  const { standard_column, columnApiRes, columnList, setColumnList, muiList, setMuiList } = props;
  const defaultValue = Object.entries(columnApiRes?.data || {}).find((item) => item[1] === standard_column)?.[0] || '';

  useEffect(() => {
    // set menu list from api and add default value into dropdown
    const dropdownOptions = Object.keys(columnApiRes?.data || {}).sort();

    setMuiList((previousLists) => {
      const updatedLists = { ...previousLists };
      const listKeys = Object.keys(updatedLists);
      listKeys.forEach((key) => {
        updatedLists[key] = dropdownOptions;
      });
      return updatedLists;
    });
    if (defaultValue) {
      setColumnList((previousValues) => ({
        ...previousValues,
        [standard_column]: defaultValue
      }));
    }
  }, []);

  // useEffect(() => {
  //   //logic: user should not select same value from dropdown, value of selected dd should not appear in others dd
  //   const excludedValue = columnList[standard_column];
  //   if (excludedValue) {
  //     const dropdownOptions = Object.keys(columnApiRes?.data || {});
  //     setMuiList((previousMuiList) => {
  //       const updatedMuiList = { ...previousMuiList };
  //       Object.keys(updatedMuiList).forEach((column) => {
  //         if (column !== standard_column) {
  //           updatedMuiList[column] = dropdownOptions.filter((item) => item !== excludedValue);
  //         }
  //       });
  //       return updatedMuiList;
  //     });
  //   }
  // }, [columnList]);

  const handleStatusChange = (value) => {
    setColumnList((prevData) => ({
      ...prevData,
      [standard_column]: value
    }));
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            '& > :not(style)': { width: '100%' },
            textAlign: 'center'
          }}
          autoComplete="off"
        >
          <TextField
            name={'standard_column'}
            value={standard_column}
            id="standard-basic"
            label="Standard field"
            variant="outlined"
            disabled={true}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '3px'
              }
            }}
            // multiple
            freeSolo
            options={muiList[standard_column]}
            getOptionLabel={(option) => option}
            value={columnList[standard_column]}
            onChange={(event, value) => handleStatusChange(value)}
            renderInput={(params) => <TextField {...params} placeholder="Select" />}
          />
        </Box>
      </Grid>
    </>
  );
};

ColumnMapAtoms.propTypes = {
  standard_column: PropTypes.string.isRequired,
  columnApiRes: PropTypes.object,
  columnList: PropTypes.array,
  setColumnList: PropTypes.func,
  muiList: PropTypes.array,
  setMuiList: PropTypes.func
};

export default ColumnMapAtoms;
