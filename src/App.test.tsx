import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders profile name', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const nameElement = screen.getByText(/John Doe/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders profile phone number', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const phoneElement = screen.getByText(/358401234567/i);
  expect(phoneElement).toBeInTheDocument();
});

test('renders profile email address', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const emailElement = screen.getByText(/john@example.com/i);
  expect(emailElement).toBeInTheDocument();
});
