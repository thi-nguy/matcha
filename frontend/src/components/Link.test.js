import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Link } from './Link';

test('Test Link text value', async() => {
  render(<Link title='Click here' onClick={null} />);
  expect(screen.getByText('Click here')).toBeVisible();
});
