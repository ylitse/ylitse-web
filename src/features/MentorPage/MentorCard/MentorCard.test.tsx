/**
 * @jest-environment jsdom
 */
/*
import { render } from '@testing-library/react';
import MentorCard from './MentorCard';
import { BrowserRouter } from 'react-router-dom';
import { ListCardProps } from '../ListCard/types';
import { handleSetVisibleCardProps } from '../MentorPage';

const mentorListCards: ListCardProps = {
  mentor: {
    displayName: 'Matti Meikäläinen',
    birthYear: 1993,
    region: 'Pirkanmaa',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
    skills: [
      { text: 'Lastensuojelu' },
      { text: 'Itsenäistyminen' },
      { text: 'Vanhemmuus' },
      { text: 'Opiskelu' },
      { text: 'Kela-asiointi' },
      { text: 'Raskausaika' },
      { text: 'Päihdeongelmat' },
    ],
    languages: ['Suomi', 'Englanti'],
  },
  isLoggedIn: true,
  isNewMentor: true,
  contactMessage: 'Voit ottaa yhteyttä!',
};

const mentorListCards2: ListCardProps = {
  mentor: {
    displayName: 'Matti Meikäläinen',
    birthYear: 1993,
    region: 'Pirkanmaa',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
    skills: [
      { text: 'Lastensuojelu' },
      { text: 'Itsenäistyminen' },
      { text: 'Vanhemmuus' },
      { text: 'Opiskelu' },
      { text: 'Kela-asiointi' },
      { text: 'Raskausaika' },
      { text: 'Päihdeongelmat' },
    ],
    languages: ['Suomi', 'Englanti'],
  },
  isLoggedIn: false,
  isNewMentor: true,
  contactMessage: 'Voit ottaa yhteyttä!',
};

const mentorListCards3: ListCardProps = {
  mentor: {
    displayName: 'Matti Meikäläinen',
    birthYear: 1993,
    region: 'Pirkanmaa',
    story:
      'Olen nuorisokodista itsenäistynyt teini-ikäisen pojan äiti. Voin olla sinulle tukena opintoihin, itsenäistymiseen, jälkihuoltoon ja vanhem- muuteen liittyvissä asioissa. Minulta voi kysyä näihin asioihin liittyen tai mistä tahansa muusta mieltä painavasta asiasta. Toivon, että otat rohkeasti yhteyttä. Yhdessä varmasti keksimme keinoja, millä ongelmaasi voisi löytää ratkaisun. Tulehan sanomaan moikka!',
    skills: [
      { text: 'Lastensuojelu' },
      { text: 'Itsenäistyminen' },
      { text: 'Vanhemmuus' },
      { text: 'Opiskelu' },
      { text: 'Kela-asiointi' },
      { text: 'Raskausaika' },
      { text: 'Päihdeongelmat' },
    ],
    languages: ['Suomi', 'Englanti'],
  },
  isLoggedIn: true,
  isNewMentor: false,
  contactMessage: 'Voit ottaa yhteyttä!',
};

describe('<MentorListItem />', () => {
  const handleSetVisibleCard = ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => {
    console.log(shouldShowMentorCard, mentorCardData);
  };
  it('Mentor List Item with mentor cards is rendered correctly', () => {
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={mentorListCards}
        />
      </BrowserRouter>,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });
  it('Mentor List Item name in header is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={mentorListCards}
        />
      </BrowserRouter>,
    );
    expect(queryAllByText('Matti Meikäläinen')).toBeTruthy();
  });
  it('New mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={mentorListCards}
        />
      </BrowserRouter>,
    );
    expect(queryAllByText('Uusi')).toBeTruthy();
  });
  it('Offline mentor is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={mentorListCards2}
        />
      </BrowserRouter>,
    );
    expect(queryAllByText('Ei tavoitettavissa')).toBeTruthy();
  });
  it('Online mentor is rendered correctly', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={mentorListCards3}
        />
      </BrowserRouter>,
    );
    expect(queryByText('Ei tavoitettavissa')).toBeNull();
  });
});*/
