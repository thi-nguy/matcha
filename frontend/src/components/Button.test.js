import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

test('Assert that button has the correct text', async() => {
  render(<Button>Submit</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Submit');
});
