import { render } from '@testing-library/react';
import { MentorCard } from './MentorCard';

const mentors = [
  {
    mentorId: 'asdf908asdf',
    buddyId: 'asdf908asdf',
    gender: 'muusu',
    communicationChannels: [],
    name: 'Matti Meikäläinen',
    age: 21,
    region: 'Pirkanmaa',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
    skills: [
      'Lastensuojelu',
      'Itsenäistyminen',
      'Vanhemmuus',
      'Opiskelu',
      'Kela-asiointi',
      'Raskausaika',
      'Päihdeongelmat',
    ],
    languages: ['Suomi', 'Englanti'],
    isVacationing: true,
    statusMessage: 'Voit ottaa yhteyttä!',
  },
  {
    mentorId: 'asdfasdertsdf',
    buddyId: 'asdfasdertsdf',
    gender: 'muusu',
    communicationChannels: [],
    name: 'Matti Meikäläinen',
    age: 21,
    region: 'Pirkanmaa',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
    skills: [
      'Lastensuojelu',
      'Itsenäistyminen',
      'Vanhemmuus',
      'Opiskelu',
      'Kela-asiointi',
      'Raskausaika',
      'Päihdeongelmat',
    ],
    languages: ['Suomi', 'Englanti'],
    isVacationing: false,
    statusMessage: 'Voit ottaa yhteyttä!',
  },
];

const onDismiss = jest.fn();

describe('<MentorListItem />', () => {
  it('Mentor List Item with mentor data is rendered correctly', () => {
    const { queryAllByTestId } = render(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });

  it('Mentor List Item name in header is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('Matti Meikäläinen')).toBeTruthy();
  });

  it('New mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('Uusi')).toBeTruthy();
  });

  it('Offline mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorCard onDismiss={onDismiss} mentor={mentors[0]} />,
    );
    expect(queryAllByText('Ei tavoitettavissa').length).toBe(1);
  });

  it('Online mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorCard onDismiss={onDismiss} mentor={mentors[1]} />,
    );
    expect(queryAllByText('Ei tavoitettavissa').length).toBe(0);
  });
});
