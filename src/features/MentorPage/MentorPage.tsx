import OneContainerLayout from '../../components/OneContainerLayout';
import MentorInfoSearchDiv from './MentorSearch';
import MentorChips from './MentorChips';
import MentorListItems from './MentorListItems';
import PageLayout from '../../components/PageLayout';
import React from 'react';
import MentorCard from './MentorCard';
import { Mentor, useGetMentorsQuery } from './mentorPageApi';

const mentorPageHeadline = 'Mentorit';

//test content for multiple chips
const mentorChipList: Array<string> = [
  '2-suuntainen',
  '2-suuntaisen läheisenä oleminen',
  'ARFID',
  'Ahdistus',
  'Aikuisena opiskelu',
  'Alkoholismi',
  'Arjenhallinta',
  'Arjessa jaksaminen',
  'Arki lastensuojelulaitoksessa',
  'Dermatophagia',
  'Erotilanteet',
  'Estynyt persoonallisuushäiriö',
  'Finfami',
  'Harrastukset',
  'Henkinen väkivalta',
  'Huostaanotto',
  'Huumeet',
  'Häpeä',
  'IBS',
  'Identiteetti',
  'Identiteettiongelmat',
  'Itsenäistyminen',
  'Itsetuhoisuus',
  'Jaksaminen opinnoissa',
  'Jälkihuolto',
  'Kehon ja mielen yhteys',
  'Kehopositiivisuus',
  'Kela-asiointi',
  'Kiusaaminen',
  'Kokemukset lastensuojelusta',
  'Koulukiusaaminen',
  'LGBTQ',
  'LHBT+',
  'Lapsi huostaanotettu',
  'Lapsuuden traumat',
  'Lasinen lapsuus',
  'Lasten kasvattaminen',
  'Lastensuojelu',
  'Läheisen menetys',
  'Läheisverkosto',
  'Lääkkeet',
  'Maahanmuutto',
  'Masennus',
  'Meijän mieli',
  'Mielenterveys',
  'Mielenterveysongelmat',
  'Mielenterveyspalvelut',
  'Minäkuva',
  'Narsistin läheinen',
  'Neurologiset häiriöt',
  'Neuvolassa asiointi',
  'OCD',
  'Omaan kotiin muuttaminen',
  'Omien asiakirjojen läpikäyminen',
  'Ongelmat työelämässä',
  'Opintoihin hakeminen',
  'Opiskelu',
  'Opiskelu-uupumus',
  'PTSD',
  'Pakko-oireet',
  'Parisuhde',
  'Parisuhteen haasteet',
  'Peliriippuvuus',
  'Pelkotilat',
  'Perfektionismi',
  'Perhe-elämä',
  'Perheväkivalta',
  'Psykiatria',
  'Psykoosisairaudet',
  'Päihdeongelmat',
  'Rahaongelmat',
  'Raskausaika',
  'Riippuvainen persoonallisuushäiriö',
  'Riippuvuudet',
  'Sateenkaariperhe',
  'Seksuaalinen väkivalta',
  'Sijaiskodissa asuminen',
  'Sosiaalisten tilanteiden pelko',
  'Syyllisyys',
  'Syömishäiriöt',
  'Taloudelliset vaikeudet',
  'Teini-ikä',
  'Terapia',
  'Terapiaan hakeminen',
  'Traumat',
  'Tuen piiriin hakeutuminen',
  'Tuki mentoreille',
  'Tunteiden hallinta',
  'Työnhaku ja työelämä',
  'Työttömyys',
  'Unelmat',
  'Uupuminen',
  'Uusi ammatti',
  'Uusiin ihmisiin tutustuminen',
  'Vanhemmaksi tuleminen',
  'Vanhemmuuden haasteet',
  'Vanhemmuuden tukeminen',
  'Vanhemmuus sijoituksen aikana',
  'Verkkoauttaminen',
  'Viiltely',
  'Viranomaisten kanssa työskentely',
  'Välit vanhempiin',
  'Väsymys',
  'Yeesi',
  'Yksinhuoltajuus',
  'Yksinäisyys',
  'add',
  'adhd',
  'alkoholistin lapsi',
  'arvot',
  'autismi',
  'avioero',
  'avohuollon sijoitus',
  'biseksuaalisuus',
  'erakoituminen',
  'hyvinvointi',
  'ihmissuhteet',
  'jaksaminen',
  'kouluvalinta',
  'lastenkodit',
  'liikunta',
  'luottamuspula',
  'mielenterveyskuntoutuja',
  'paniikki',
  'parisuhdeväkivalta',
  'päihdeongelmaisen läheinen',
  'riittämättömyys',
  'tunnetaidot',
  'työkyvyttömyyseläke',
  'uusioperhe',
  'vanhemman aivovamma',
  'vanhemman menetys',
  'vanhemmuus',
  'väkivalta',
];

export type handleSetVisibleCardProps = {
  shouldShowMentorCard: boolean;
  mentorCardData: Mentor | undefined;
};

const MentorPage = () => {
  const [shouldShowMentorCard, setVisibleCard] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState<Mentor | undefined>();

  const { data, error, isLoading } = useGetMentorsQuery();
  if (isLoading) {
    return <div>LOADING</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleSetVisibleCard = ({
    shouldShowMentorCard,
    mentorCardData,
  }: handleSetVisibleCardProps) => {
    setVisibleCard(shouldShowMentorCard);
    setCurrentCard(mentorCardData);
  };
  return (
    <PageLayout>
      {shouldShowMentorCard && currentCard && (
        <MentorCard
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={currentCard}
        />
      )}
      <OneContainerLayout headLine={mentorPageHeadline}>
        <MentorInfoSearchDiv />
        <MentorChips items={mentorChipList} />
      </OneContainerLayout>
      {data && (
        <MentorListItems
          setVisibleCard={handleSetVisibleCard}
          mentorCardData={data}
        />
      )}
    </PageLayout>
  );
};
export default MentorPage;
