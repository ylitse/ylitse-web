/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import MentorCard from './MentorCard';
import { BrowserRouter } from 'react-router-dom';
import { handleSetVisibleCardProps } from '../MentorPage';
import { Mentor } from '../mentorPageApi';

const mentorListCard: Mentor = {
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
};

const mentorListCard2: Mentor = {
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
          mentorCardData={mentorListCard}
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
          mentorCardData={mentorListCard}
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
          mentorCardData={mentorListCard}
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
          mentorCardData={mentorListCard2}
        />
      </BrowserRouter>,
    );
    expect(queryAllByText('Ei tavoitettavissa')).toBeTruthy();
  });
});
