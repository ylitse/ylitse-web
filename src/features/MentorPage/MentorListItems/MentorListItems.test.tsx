/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import MentorListItems from './MentorListItems';
import { BrowserRouter } from 'react-router-dom';
import { MentorProps } from '../../../components/ListCard/types';

/**
 * When card layout is done, card rendering should be added
 * When card fetching logic is added, some checking that
 * right cards are rendered should be added
 */

const mentorListCards: Array<MentorProps> = [
  {
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
  {
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
];

describe('<MentorListItem />', () => {
  it('Mentor List Item with mentor cards is rendered correctly', () => {
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <MentorListItems listitems={mentorListCards} />
      </BrowserRouter>,
    );
    expect(queryAllByTestId('mentor-cards-container')).toBeTruthy();
  });
});
