/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MentorChips from './MentorChips';

describe('<MentorChips />', () => {
  const items: Array<string> = ['test chip'];

  it('Mentor chips are rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorChips skills={items} />
      </BrowserRouter>,
    );
    expect(queryAllByText('test chip')).toBeTruthy();
  });
});
