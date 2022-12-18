import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../../test/server';
import { rest } from 'msw';
import { renderWithProviders } from '@/test/testStore';

const mentorsResponse = {
  resources: [],
};

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

server.use(
  rest.get(`api/mentors`, (_req, res, ctx) => {
    return res(ctx.json(mentorsResponse), ctx.delay(150));
  }),
);

describe('<Navigation/>', () => {
  it('Can navigate to other page', async () => {
    const { getByRole, findByText, user } = renderWithProviders(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    // Go to Mentors-page
    const link = getByRole('link', { name: 'Chat' });
    user.click(link);

    expect(await findByText(/Chatsivu/i)).toBeInTheDocument();
  });
});
