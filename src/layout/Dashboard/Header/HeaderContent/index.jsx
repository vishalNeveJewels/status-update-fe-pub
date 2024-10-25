import { useState, useEffect } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import { Map as MapIcon, Assignment as AssignmentIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';

// project import

import Profile from './Profile';

import MobileSection from './MobileSection';

import { useLocation, Link } from 'react-router-dom';

import { getItemFromLocalStorage } from 'utils/localStorageUtils';

const ClickableCard = ({ title, to, icon }) => (
  <Link
    to={to}
    style={{
      display: 'flex',
      alignItems: 'center',
      columnGap: '0.5rem',
      cursor: 'pointer',
      border: '1px solid #ccc',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      transition: 'background-color 0.3s',
      padding: '0.2rem 1rem',
      height: 'fit-content',
      textDecoration: 'none'
    }}
  >
    {icon}
    <span
      style={{
        margin: '0'
      }}
    >
      {title}
    </span>
  </Link>
);

export default function HeaderContent() {
  const [activeVendorCard, setActiveVendorCard] = useState('');
  let location = useLocation();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const userDetails = getItemFromLocalStorage('userTypeIs');
  const isUserTypeVendor = userDetails?.userTypeValue === 3;

  const handleRedirect = (newPart) => {
    const pathParts = location.pathname.split('/');
    pathParts[pathParts.length - 1] = newPart;
    const newPath = pathParts.join('/');
    return newPath;
  };

  useEffect(() => {
    const fetchedUrlData = location?.pathname.split('/');
    setActiveVendorCard(fetchedUrlData[fetchedUrlData.length - 1]);
  }, [location]);

  return (
    <>
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {!isUserTypeVendor &&
        (activeVendorCard === 'column-map' ? (
          <div
            style={{
              display: 'flex',
              columnGap: '1rem'
            }}
          >
            <ClickableCard title="Map Status" to={handleRedirect('status-map')} icon={<AssignmentIcon />} />

            <ClickableCard title="Upload File" to={handleRedirect('upload')} icon={<UploadFileIcon />} />
          </div>
        ) : activeVendorCard === 'status-map' ? (
          <div
            style={{
              display: 'flex',
              columnGap: '1rem'
            }}
          >
            <ClickableCard title="Map Column" to={handleRedirect('column-map')} icon={<MapIcon />} />
            <ClickableCard title="Upload File" to={handleRedirect('upload')} icon={<UploadFileIcon />} />
          </div>
        ) : activeVendorCard === 'upload' ? (
          <div
            style={{
              display: 'flex',
              columnGap: '1rem'
            }}
          >
            <ClickableCard title="Map Column" to={handleRedirect('column-map')} icon={<MapIcon />} />
            <ClickableCard title="Map Status" to={handleRedirect('status-map')} icon={<AssignmentIcon />} />
          </div>
        ) : null)}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}

ClickableCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  to: PropTypes.string.isRequired
};
