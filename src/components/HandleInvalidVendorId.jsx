import React from 'react';
import InvalidVendor from './InvalidVendor';

const HandleInvalidVendorId = ({ error = {}, children }) => {
  const isVendorIdInvalid = [404, 500].includes(error?.response?.data?.status);

  if (isVendorIdInvalid) {
    return <InvalidVendor />;
  } else {
    return children;
  }
};

export default HandleInvalidVendorId;
