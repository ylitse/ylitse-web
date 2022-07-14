/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import MentorCards from './MentorCards';
import { BrowserRouter } from 'react-router-dom';

/**
 * When card layout is done, card rendering should be added
 * When card fetching logic is added, some checking that
 * right cards are rendered should be added
 */

describe('<MentorCards />', () => {
  it('Mentor Cards container is rendered correctly', () => {
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <MentorCards />
      </BrowserRouter>,
    );
    expect(queryAllByTestId('mentori-cards-container')).toBeTruthy();
  });
});
