/**
 * @jest-environment jsdom
 */
import { render} from '@testing-library/react';
import RegisterPage from './RegisterPage';

it('Register page is rendered correctly', () => {
  const { queryAllByText } = render(
    <RegisterPage />,
  );
  expect(queryAllByText('Rekisteröidy')).toBeTruthy();
});