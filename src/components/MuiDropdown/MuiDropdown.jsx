import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Chip } from '@mui/material';

const MuiDropdown = (props) => {
  const { menuList, label = 'label', handleChange, minWidth, defaultValue } = props;
  const initialValue = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [currValue, setCurrValue] = useState([...initialValue]);

  const handleOnChange = (event) => {
    if (event.target.value?.length > 1) return;

    setCurrValue(event.target.value);
    handleChange(event.target.value);
  };

  const handleDelete = (value) => {
    setCurrValue(currValue.filter((item) => item.value !== value));
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
      <Select
        sx={{ minWidth: minWidth || '100%' }}
        labelId="demo-multiple-chip-label"
        multiple
        value={currValue}
        onChange={handleOnChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={menuList.find((option) => option.value === value)?.value}
                onDelete={() => handleDelete(value)}
                deleteIcon={<span>×</span>}
              />
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
              width: 250
            }
          }
        }}
      >
        {menuList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={currValue.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MuiDropdown.propTypes = {
  menuList: PropTypes.array,
  label: PropTypes.string,
  minWidth: PropTypes.any,
  handleChange: PropTypes.func,
  defaultValue: PropTypes.array
};

export default MuiDropdown;
