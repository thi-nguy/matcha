import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListElementHighlight } from './ListElementHighlight';

test('Assert that list is displaying corretly', async() => {
  render(<ListElementHighlight number='1' title='title 1' subtitle='subtitle 1' />);
  expect(screen.getByText('1. title 1')).toBeVisible();
  expect(screen.getByText('subtitle 1')).toBeVisible();
});
