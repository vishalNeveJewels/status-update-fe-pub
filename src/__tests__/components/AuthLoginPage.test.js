import React from 'react';
import AuthLogin from '../../pages/authentication/auth-forms/AuthLogin';
import { render, screen, fireEvent } from '@testing-library/react';
import { postData } from '../../api/apiService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

jest.mock('../../api/apiService');

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate
}));

test('renders component correctly', async () => {
  const authLoginApiResponse = {
    data: {
      token: '',
      userType: null
    },
    msg: '',
    status: null
  };

  postData.mockResolvedValue(authLoginApiResponse);
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthLogin />
      </BrowserRouter>
    </QueryClientProvider>
  );

  fireEvent.click(screen.getByText('Login'));

  expect(await screen.findByText('Login')).toBeInTheDocument();
});
