import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorInfoSearch';
import MentorChips from './MentorChips';
import { ChipProps } from '../../components/Chip/types';
import MentorListItems from './MentorListItems';
import PageLayout from '../../components/PageLayout';
import { MentorProps } from '@/components/ListCard/types';

const mentorPageHeadline = 'Mentorit';

//test content for multiple chips
const mentorChipList: Array<ChipProps> = [
  {
    text: '2-suuntainen',
  },
  {
    text: '2-suuntaisen läheisenä oleminen',
  },
  {
    text: 'ARFID',
  },
  {
    text: 'Ahdistus',
  },
  {
    text: 'Aikuisena opiskelu',
  },
  {
    text: 'Alkoholismi',
  },
  {
    text: 'Arjenhallinta',
  },
  {
    text: 'Arjessa jaksaminen',
  },
  {
    text: 'Arki lastensuojelulaitoksessa',
  },
  {
    text: 'Dermatophagia',
  },
  {
    text: 'Erotilanteet',
  },
  {
    text: 'Estynyt persoonallisuushäiriö',
  },
  {
    text: 'Finfami',
  },
  {
    text: 'Harrastukset',
  },
  {
    text: 'Henkinen väkivalta',
  },
  {
    text: 'Huostaanotto',
  },
  {
    text: 'Huumeet',
  },
  {
    text: 'Häpeä',
  },
  {
    text: 'IBS',
  },
  {
    text: 'Identiteetti',
  },
  {
    text: 'Identiteettiongelmat',
  },
  {
    text: 'Itsenäistyminen',
  },
  {
    text: 'Itsetuhoisuus',
  },
  {
    text: 'Jaksaminen opinnoissa',
  },
  {
    text: 'Jälkihuolto',
  },
  {
    text: 'Kehon ja mielen yhteys',
  },
  {
    text: 'Kehopositiivisuus',
  },
  {
    text: 'Kela-asiointi',
  },
  {
    text: 'Kiusaaminen',
  },
  {
    text: 'Kokemukset lastensuojelusta',
  },
  {
    text: 'Koulukiusaaminen',
  },
  {
    text: 'LGBTQ',
  },
  {
    text: 'LHBT+',
  },
  {
    text: 'Lapsi huostaanotettu',
  },
  {
    text: 'Lapsuuden traumat',
  },
  {
    text: 'Lasinen lapsuus',
  },
  {
    text: 'Lasten kasvattaminen',
  },
  {
    text: 'Lastensuojelu',
  },
  {
    text: 'Läheisen menetys',
  },
  {
    text: 'Läheisverkosto',
  },
  {
    text: 'Lääkkeet',
  },
  {
    text: 'Maahanmuutto',
  },
  {
    text: 'Masennus',
  },
  {
    text: 'Meijän mieli',
  },
  {
    text: 'Mielenterveys',
  },
  {
    text: 'Mielenterveysongelmat',
  },
  {
    text: 'Mielenterveyspalvelut',
  },
  {
    text: 'Minäkuva',
  },
  {
    text: 'Narsistin läheinen',
  },
  {
    text: 'Neurologiset häiriöt',
  },
  {
    text: 'Neuvolassa asiointi',
  },
  {
    text: 'OCD',
  },
  {
    text: 'Omaan kotiin muuttaminen',
  },
  {
    text: 'Omien asiakirjojen läpikäyminen',
  },
  {
    text: 'Ongelmat työelämässä',
  },
  {
    text: 'Opintoihin hakeminen',
  },
  {
    text: 'Opiskelu',
  },
  {
    text: 'Opiskelu-uupumus',
  },
  {
    text: 'PTSD',
  },
  {
    text: 'Pakko-oireet',
  },
  {
    text: 'Parisuhde',
  },
  {
    text: 'Parisuhteen haasteet',
  },
  {
    text: 'Peliriippuvuus',
  },
  {
    text: 'Pelkotilat',
  },
  {
    text: 'Perfektionismi',
  },
  {
    text: 'Perhe-elämä',
  },
  {
    text: 'Perheväkivalta',
  },
  {
    text: 'Psykiatria',
  },
  {
    text: 'Psykoosisairaudet',
  },
  {
    text: 'Päihdeongelmat',
  },
  {
    text: 'Rahaongelmat',
  },
  {
    text: 'Raskausaika',
  },
  {
    text: 'Riippuvainen persoonallisuushäiriö',
  },
  {
    text: 'Riippuvuudet',
  },
  {
    text: 'Sateenkaariperhe',
  },
  {
    text: 'Seksuaalinen väkivalta',
  },
  {
    text: 'Sijaiskodissa asuminen',
  },
  {
    text: 'Sosiaalisten tilanteiden pelko',
  },
  {
    text: 'Syyllisyys',
  },
  {
    text: 'Syömishäiriöt',
  },
  {
    text: 'Taloudelliset vaikeudet',
  },
  {
    text: 'Teini-ikä',
  },
  {
    text: 'Terapia',
  },
  {
    text: 'Terapiaan hakeminen',
  },
  {
    text: 'Traumat',
  },
  {
    text: 'Tuen piiriin hakeutuminen',
  },
  {
    text: 'Tuki mentoreille',
  },
  {
    text: 'Tunteiden hallinta',
  },
  {
    text: 'Työnhaku ja työelämä',
  },
  {
    text: 'Työttömyys',
  },
  {
    text: 'Unelmat',
  },
  {
    text: 'Uupuminen',
  },
  {
    text: 'Uusi ammatti',
  },
  {
    text: 'Uusiin ihmisiin tutustuminen',
  },
  {
    text: 'Vanhemmaksi tuleminen',
  },
  {
    text: 'Vanhemmuuden haasteet',
  },
  {
    text: 'Vanhemmuuden tukeminen',
  },
  {
    text: 'Vanhemmuus sijoituksen aikana',
  },
  {
    text: 'Verkkoauttaminen',
  },
  {
    text: 'Viiltely',
  },
  {
    text: 'Viranomaisten kanssa työskentely',
  },
  {
    text: 'Välit vanhempiin',
  },
  {
    text: 'Väsymys',
  },
  {
    text: 'Yeesi',
  },
  {
    text: 'Yksinhuoltajuus',
  },
  {
    text: 'Yksinäisyys',
  },
  {
    text: 'add',
  },
  {
    text: 'adhd',
  },
  {
    text: 'alkoholistin lapsi',
  },
  {
    text: 'arvot',
  },
  {
    text: 'autismi',
  },
  {
    text: 'avioero',
  },
  {
    text: 'avohuollon sijoitus',
  },
  {
    text: 'biseksuaalisuus',
  },
  {
    text: 'erakoituminen',
  },
  {
    text: 'hyvinvointi',
  },
  {
    text: 'ihmissuhteet',
  },
  {
    text: 'jaksaminen',
  },
  {
    text: 'kouluvalinta',
  },
  {
    text: 'lastenkodit',
  },
  {
    text: 'liikunta',
  },
  {
    text: 'luottamuspula',
  },
  {
    text: 'mielenterveyskuntoutuja',
  },
  {
    text: 'paniikki',
  },
  {
    text: 'parisuhdeväkivalta',
  },
  {
    text: 'päihdeongelmaisen läheinen',
  },
  {
    text: 'riittämättömyys',
  },
  {
    text: 'tunnetaidot',
  },
  {
    text: 'työkyvyttömyyseläke',
  },
  {
    text: 'uusioperhe',
  },
  {
    text: 'vanhemman aivovamma',
  },
  {
    text: 'vanhemman menetys',
  },
  {
    text: 'vanhemmuus',
  },
  {
    text: 'väkivalta',
  },
];

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
    displayName: 'Maija',
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
    displayName: 'Kaapo',
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

const MentorPage = () => {
  return (
    <PageLayout>
      <OneContainerLayout headLine={mentorPageHeadline}>
        <MentorInfoSearchDiv />
        <MentorChips items={mentorChipList} />
      </OneContainerLayout>
      <MentorListItems listitems={mentorListCards} />
    </PageLayout>
  );
};
export default MentorPage;
