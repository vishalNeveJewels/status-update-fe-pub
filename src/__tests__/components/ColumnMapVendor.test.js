import { getColumnData } from 'pages/VendorsPage/ColumnMap/ColumnMapVendor';
import { getData } from '../../api/apiService';
jest.mock('../../api/apiService');

describe('get columnData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch column map data with correct parameters', async () => {
    // Arrange: Set up the mock implementation for getData

    const mockColumnMapData = {
      status: 200,
      msg: 'Column map fetched successfully',
      data: {
        Qty: 'o_num',
        'Prd Ord Number': 'status'
      }
    };

    getData.mockResolvedValue(mockColumnMapData); // Mock the resolved value of getData

    // Act: Call the function
    const result = await getColumnData('8972');

    expect(result).toEqual(mockColumnMapData);
  });
});
