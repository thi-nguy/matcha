import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextInput } from './TextInput';

test('Assert that placeholder is working corretly', async() => {
  render(<TextInput title='Email' placeholder='Your email address' />);
  const placeHolder = screen.getByPlaceholderText('Your email address');
  expect(placeHolder).toBeVisible();
});

test('Assert input without secure', async() => {
  render(<TextInput title='Email' placeholder='Your email address' value='test@email.com' onChange={(text) => text} secure={false} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('test@email.com');
});

test('Assert input with secure', async() => {
  render(<TextInput title='Password' placeholder='Your password' value='pass' onChange={(text) => text} secure={true} />);
  const input = screen.getByPlaceholderText('Your password');
  expect(input).toHaveAttribute('type', 'password');
});
