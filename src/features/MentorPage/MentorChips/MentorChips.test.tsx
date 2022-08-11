/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChipProps } from '../../../components/Chip/types';
import MentorChips from './MentorChips';

describe('<MentorChips />', () => {
  const items: Array<ChipProps> = [{ text: 'test chip' }];

  it('Mentor chips are rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorChips items={items} />
      </BrowserRouter>,
    );
    expect(queryAllByText('test chip')).toBeTruthy();
  });
});
