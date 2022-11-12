import { render } from '@testing-library/react';
import MentorSearch from './Search';

describe('<MentorSearch />', () => {
  it('Mentor search input is rendered correctly', () => {
    const { queryAllByLabelText } = render(<MentorSearch />);
    expect(queryAllByLabelText('Etsi mentoria')).toBeTruthy();
  });

  it('Mentor search icon is rendered correctly', () => {
    const { queryAllByLabelText } = render(<MentorSearch />);
    expect(queryAllByLabelText('Etsi mentoria icon')).toBeTruthy();
  });
});
