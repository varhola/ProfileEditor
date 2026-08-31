import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditPage from './EditPage';
import { getProfile } from '../profileStorage';

function renderEditPage() {
  return render(
    <MemoryRouter initialEntries={['/edit']}>
      <Routes>
        <Route path="/edit" element={<EditPage />} />
        <Route path="/profile" element={<div>Profile Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe('EditPage rendering', () => {
  test('renders current profile values', () => {
    const profile = getProfile();
    renderEditPage();

    expect(screen.getByLabelText(/email/i)).toHaveValue(profile.email);
    expect(screen.getByLabelText(/phone/i)).toHaveValue(profile.phone);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });
});

describe('EditPage validation', () => {
  test('shows error when email is empty', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });

  test('shows error for invalid email format', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(
      await screen.findByText('Email is not in a valid format')
    ).toBeInTheDocument();
  });

  test('shows error when phone is empty', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(await screen.findByText('Phone is required')).toBeInTheDocument();
  });

  test('shows error for invalid phone format', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(
      await screen.findByText('Phone is not in a valid format')
    ).toBeInTheDocument();
  });

  test('shows error for short password when a password is entered', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(
      await screen.findByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  test('shows error when passwords do not match', async () => {
    renderEditPage();
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'different123' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
  });
});

describe('EditPage submit', () => {
  test('saves updated profile to localStorage and navigates', async () => {
    const existing = getProfile();
    renderEditPage();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '+358999888777' },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    await waitFor(() => {
      expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });

    const saved = JSON.parse(localStorage.getItem('profile')!) as {
      email: string;
      phone: string;
      name: string;
      avatar: string;
      password: string;
    };
    expect(saved.email).toBe('new@example.com');
    expect(saved.phone).toBe('+358999888777');
    expect(saved.name).toBe(existing.name);
    expect(saved.avatar).toBe(existing.avatar);
    expect(saved.password).toBe('password123');
  });

  test('saves updated profile without a password and preserves stored password', async () => {
    localStorage.setItem(
      'profile',
      JSON.stringify({ ...getProfile(), password: 'existingpass' })
    );
    renderEditPage();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'changed@example.com' },
    });
    fireEvent.click(screen.getByDisplayValue('Save Changes'));

    await waitFor(() => {
      expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });

    const saved = JSON.parse(localStorage.getItem('profile')!) as {
      email: string;
      password: string;
    };
    expect(saved.email).toBe('changed@example.com');
    expect(saved.password).toBe('existingpass');
  });
});
