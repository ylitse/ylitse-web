import MentorPage from './MentorPage';
import { server } from '../../test/server';
import { renderWithProviders } from '../../test/testStore';
import { rest } from 'msw';
import * as config from '../../utils/endpoints';

const mentorsResponse = {
  resources: [
    {
      user_id: 'user_id_1',
      id: 'id_1',
      birth_year: 1991,
      display_name: 'Nick',
      story: `I'm a mentor`,
      region: 'Helsinki',
      skills: ['Belly dancing'],
      languages: ['fi'],
      is_vacationing: false,
      status_message: `I'm here`,
      gender: 'male',
      communication_channels: [],
    },
    {
      user_id: 'user_id_2',
      id: 'id_2',
      birth_year: 1998,
      display_name: 'Duffel',
      story: 'I help',
      region: 'Vantaa',
      skills: ['Juggling'],
      languages: ['fi'],
      is_vacationing: true,
      status_message: `I'm back next week`,
      gender: 'female',
      communication_channels: [],
    },
  ],
};

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('<MentorPage />', () => {
  it('displays fetched mentors in list and can open the card for more information', async () => {
    server.use(
      rest.get(`${config.baseUrl}/mentors`, (_req, res, ctx) => {
        return res(ctx.json(mentorsResponse), ctx.delay(150));
      }),
    );

    const { user, getByRole, findByRole, getByText, getAllByRole } =
      renderWithProviders(<MentorPage />);

    // should be loading initially
    expect(getByRole('progressbar')).toBeInTheDocument();

    // after some time, the mentors should be received
    expect(
      await findByRole('heading', { name: /Mentorit/i }),
    ).toBeInTheDocument();

    // see that mentorResponse-mentor is found from list
    const mentorText = getByText(mentorsResponse.resources[0].display_name);
    expect(mentorText).toBeInTheDocument();

    // open the card for more information
    const openMentorCardButtons = getAllByRole('button', {
      name: /Avaa kortti/i,
    });
    await user.click(openMentorCardButtons[0]);
    const openChatButton = getByText('Avaa keskustelu');
    expect(openChatButton).toBeInTheDocument();

    // close the mentorcard again
    const closeButton = getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  it('wont display mentors if response is not correct', async () => {
    server.use(
      rest.get(`${config.baseUrl}/mentors`, (_req, res, ctx) => {
        return res(
          ctx.json([{ resources: [{ wrong: 'data' }] }]),
          ctx.delay(150),
        );
      }),
    );

    const { getByRole, findByRole, queryAllByRole } = renderWithProviders(
      <MentorPage />,
    );

    // should be loading initially
    expect(getByRole('progressbar')).toBeInTheDocument();

    // after some time, the response should be received
    expect(
      await findByRole('heading', { name: /Mentorit/i }),
    ).toBeInTheDocument();

    // no cards are rendered
    const openMentorCardButtons = queryAllByRole('button', {
      name: /Avaa kortti/i,
    });

    expect(openMentorCardButtons.length).toBe(0);
  });
});
