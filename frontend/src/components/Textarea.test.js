
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextArea } from './Textarea';

test('Assert that placeholder is working corretly', async() => {
  render(<TextArea title='Email' placeholder='Your email address' />);
  const placeHolder = screen.getByPlaceholderText('Your email address');
  expect(placeHolder).toBeVisible();
});

test('Assert input is working correctly', async() => {
  render(<TextArea title='Email' placeholder='Your email address' value='test@email.com' onChange={(text) => text} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('test@email.com');
});
