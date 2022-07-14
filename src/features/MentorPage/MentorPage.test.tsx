/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import MentorPage from './MentorPage';
import { BrowserRouter } from 'react-router-dom';

describe('<MentorPage />', () => {
  it('MentorPage header is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorPage />
      </BrowserRouter>,
    );
    expect(queryAllByText('Mentorit')).toBeTruthy();
  });
  it('MentorPage description text is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorPage />
      </BrowserRouter>,
    );
    expect(
      queryAllByText('Tervetuloa selaamaan mentoreiden profiileja!'),
    ).toBeTruthy();
  });
});
