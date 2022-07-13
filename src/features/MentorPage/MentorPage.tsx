import styled from 'styled-components';
import OneCardLayout from './OneCardLayout';
import MentorInfoSearchDiv from './MentorInfoSearch';
import MentorChips from './MentorChips';
import MentorCards from './MentorCards';

const mentorPageHeadline = 'Mentorit';

const MentorPage = () => {
  return (
    <BasicPageElement>
      <PageContent>
        <OneCardLayout headLine={mentorPageHeadline}>
          <MentorInfoSearchDiv />
          <MentorChips />
        </OneCardLayout>
        <MentorCards />
      </PageContent>
    </BasicPageElement>
  );
};

const BasicPageElement = styled.div`
  background-color: #cde8f8;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  background-color: transparent;
  position: relative;
  width: 80vw;
  height: calc(100vh - 60px - 3.5rem - 20vw);
  top: 10vw;
  left: 10vw;
  display: flex;
  flex-direction: column;
`;

export default MentorPage;
