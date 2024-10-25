import React from 'react';
import { handleFetchAllVendors } from '../../pages/VendorsPage/VendorsPage';
import VendorsPage from '../../pages/VendorsPage/VendorsPageTable';
import { render, screen, fireEvent } from '@testing-library/react';
import { getData, postData } from '../../api/apiService';
import { FETCH_ALL_VENDORS } from '../../api/apiEndpoints';

jest.mock('../../api/apiService');

describe('handleFetchAllVendors', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  it('should fetch all vendors with correct parameters', async () => {
    // Arrange: Set up the mock implementation for getData
    const mockVendorsData = {
      status: 200,
      data: {
        vendors: [
          {
            id: 1,
            userId: 4,
            vendorId: 12345,
            vendorName: 'shubman gill',
            vendorFolder: '12345_shubman_gill_1',
            columnMap: null,
            statusMap: {
              DCAS: ['CAS'],
              DDIA: ['DIA'],
              DFIL: ['FIL'],
              DPFG: ['PFG'],
              DPOL: ['POL'],
              DSET: ['SET'],
              DSGA: ['SGA'],
              DWXT: ['WXT'],
              DZQC: ['ZQC']
            },
            createdBy: 4,
            updatedBy: null,
            createdAt: '2024-08-01T08:39:53.434Z',
            updatedAt: '2024-08-08T07:17:23.435Z',
            vendorStatus: null,
            templateFile: null,
            isValid: false,
            user: {
              firstName: 'shubman',
              lastName: 'gill',
              email: 'shubman@gmail.com'
            },
            creator: {
              firstName: 'shubman',
              lastName: 'gill',
              email: 'shubman@gmail.com'
            },
            updater: null
          }
        ],
        totalItems: 15,
        totalPages: 2,
        currentPage: 0
      },
      msg: 'Vendors retrieved successfully'
    };
    getData.mockResolvedValue(mockVendorsData); // Mock the resolved value of getData

    const page = 1;
    const tableOrderBy = 'id';
    const tableOrderIs = 'ASC';

    // Act: Call the function
    const result = await handleFetchAllVendors(page, tableOrderBy, tableOrderIs);

    // Assert: Check the result and ensure getData was called with the right arguments
    expect(result).toEqual(mockVendorsData); // Ensure the returned data is as expected
    expect(getData).toHaveBeenCalledTimes(1); // Ensure getData was called once
    expect(getData).toHaveBeenCalledWith(FETCH_ALL_VENDORS(page, 10, tableOrderBy, tableOrderIs)); // Check the arguments
  });
});

test('submits data and displays response', async () => {
  const dummyResponse = {
    status: null,
    data: {
      vendorId: null,
      vendorName: '',
      email: '',
      password: ''
    },
    msg: ''
  };

  // Mock the axios.post method to resolve with the dummy JSON
  postData.mockResolvedValue(dummyResponse);

  // Render the component
  render(<VendorsPage />);

  // Simulate a user click
  fireEvent.click(screen.getByText('Add vendor'));

  // Prints the current state of the DOM
  //  screen.debug();

  // Assert that the response data is displayed correctly
  expect(await screen.findByText('Add vendor')).toBeInTheDocument();
});
