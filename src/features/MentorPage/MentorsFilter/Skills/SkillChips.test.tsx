import { render } from '@testing-library/react';
import MentorChips from './MentorChips';

describe('<MentorChips />', () => {
  const items: Array<string> = ['test chip'];

  it('Mentor chips are rendered correctly', () => {
    const { queryAllByText } = render(<MentorChips skills={items} />);
    expect(queryAllByText('test chip')).toBeTruthy();
  });
});
