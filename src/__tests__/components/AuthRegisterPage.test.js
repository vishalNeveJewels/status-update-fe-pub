import React from 'react';
import AuthRegister from '../../pages/authentication/auth-forms/AuthRegister';
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
  const authRegisterApiResponse = {
    status: null,
    data: {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userType: null,
      updatedAt: '',
      createdAt: ''
    },
    msg: ''
  };

  postData.mockResolvedValue(authRegisterApiResponse);
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthRegister />
      </BrowserRouter>
    </QueryClientProvider>
  );

  fireEvent.click(screen.getByText('Create Account'));

  expect(await screen.findByText('Create Account')).toBeInTheDocument();
});
