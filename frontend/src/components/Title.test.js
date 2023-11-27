import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Title } from './Title';

test('Assert that title is printing corretly', async() => {
  render(<Title value='Hello world' />);
  expect(screen.getByRole('heading')).toHaveTextContent('Hello world');
});
