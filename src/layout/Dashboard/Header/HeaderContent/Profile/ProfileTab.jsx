import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets

import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { useNavigate } from 'react-router';
import { removeItemFromLocalStorage } from 'utils/localStorageUtils';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 2) {
      removeItemFromLocalStorage('token');
      navigate('/login');
    }
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 2} onClick={() => handleListItemClick(2, '/login')}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
