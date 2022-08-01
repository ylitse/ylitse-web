import styled from 'styled-components';
import { ListCardProps } from './types';
import ListCardHeader from './ListCardHeader';
import * as cssVariables from '../../static/styles/variables';
import {SimpleChip} from '../Chip/';

/**
 * Div to hold mentor cards. Needs a parameter added
 * That hold the info for cards that need to be showed.
 */

const ListCard = ({ mentordata }: { mentordata: ListCardProps }) => {
  console.log(mentordata);
  const age = new Date().getFullYear() - mentordata.mentor.birthYear;
  console.log(age);
  return (
    <ListCardElement>
      <ListCardHeader
        name={mentordata.mentor.displayName}
        age={age}
        region={mentordata.mentor.region}
        available={mentordata.isLoggedIn}
        newMentor={mentordata.isNewMentor}
        message={mentordata.contactMessage}
      />
      <CardContent>
        <cssVariables.heading3_dark style={{ margin: 0 }}>
          Tarinani
        </cssVariables.heading3_dark>
				<TruncatedMultiline >{mentordata.mentor.story}</TruncatedMultiline>
				<cssVariables.heading3_dark style={{ margin: 0 }}>
          Puhun näitä kieliä
        </cssVariables.heading3_dark>
				<SkillChips >
        {mentordata.mentor.languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
			<cssVariables.heading3_dark style={{ margin: 0 }}>
          Voin auttaa myös näissä
        </cssVariables.heading3_dark>
				<SkillChips >
        {mentordata.mentor.skills.map(item => (
          <SimpleChip key={item.text} text={item.text} />
        ))}
      </SkillChips>
      </CardContent>
    </ListCardElement>
  );
};

const ListCardElement = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 24vw;
  background-color: white;
  border-radius: 0.75rem;
  flex-direction: column;
`;

const CardContent = styled.div`
  flex: 1;
	padding: 1.9rem;
`;

const TruncatedMultiline = styled.p `
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: ${cssVariables.palette.darkblue};
	width: calc(24vw - 3.8rem);
	height: 6rem;
	position: relative;
	overflow: hidden;
	&:after {
		position: absolute;
		display: block;
		width: 3rem;
		height: 1.5rem;
		content: "...";
		bottom: 0;
		right: 0;
		z-index: 10;
		background-color: white;
	}
`;

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  height: 7rem;
`;

export default ListCard;
