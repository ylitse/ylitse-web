import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { server } from '@/test/server';
import { rest } from 'msw';
import { renderWithProviders } from '@/test/testStore';
import { act } from '@testing-library/react';
import { mentorsApi } from '../MentorPage/mentorPageApi';

const mentorsResponse = {
  resources: [],
};

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

// Disable API mocking after the tests are done.
afterAll(() => {
  server.close();
  jest.useRealTimers();
});

server.use(
  rest.get(`api/mentors`, (_req, res, ctx) => {
    return res(ctx.json(mentorsResponse), ctx.delay(0));
  }),
);

describe('<Navigation/>', () => {
  it('Can navigate to other page', async () => {
    const { getByRole, findByRole, user, store } = renderWithProviders(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    act(() => {
      store.dispatch(mentorsApi.endpoints.getMentors.initiate());
      jest.advanceTimersByTime(1000);
    });

    // Go to Chat-page
    const link = getByRole('link', { name: 'navigation.mentors' });
    user.click(link);

    // the mentors should be received
    const heading = await findByRole('heading', { name: 'title' });
    expect(heading).toBeInTheDocument();
  });
});
