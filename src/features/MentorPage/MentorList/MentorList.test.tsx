import { render } from '@testing-library/react';
import MentorList from './MentorList';

const mentorListCards = {
  asdf908asdf: {
    mentorId: 'asdf908asdf',
    buddyId: 'asdf908asdf',
    gender: 'muusu',
    communication_channels: [],
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
    is_vacationing: true,
    status_message: 'Voit ottaa yhteyttä!',
  },
  asdfasdertsdf: {
    mentorId: 'asdfasdertsdf',
    buddyId: 'asdfasdertsdf',
    gender: 'muusu',
    communication_channels: [],
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
    is_vacationing: false,
    status_message: 'Voit ottaa yhteyttä!',
  },
};

describe('<MentorListItem />', () => {
  const setVisibleMentor = jest.fn();
  it('Mentor List Item with mentor cards is rendered correctly', () => {
    const { queryAllByTestId } = render(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });
  it('Mentor List Item name in header is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('Matti Meikäläinen')).toBeTruthy();
  });
  it('New mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('Uusi')).toBeTruthy();
  });
  it('Offline mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <MentorList
        setVisibleCard={setVisibleMentor}
        mentors={mentorListCards}
      />,
    );
    expect(queryAllByText('Ei tavoitettavissa')).toBeTruthy();
  });
});
