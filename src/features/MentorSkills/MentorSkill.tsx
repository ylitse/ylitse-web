import { MentorskillItem } from './types';
import styled from 'styled-components';

export const Skill = styled.button`
  flex: 0 0 auto;
  background-color: #e5e4ff;
  padding: 0.75rem 1.25rem;
  font-family: 'Source Sans Pro', cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 100%;
  color: #1c325d;
  border-radius: 1.75rem;
  margin: 0.5rem;
  height: 2.5rem;
  appearance: none;
  border: none;
  &:active,
  &:hover,
  &:focus {
    background-color: #cdcbff;
  }
`;

const MentorSkill = ({ items }: { items: Array<MentorskillItem> }) => {
  return (
    <>
      {items.map(item => (
        <Skill key={item.text} value={item.text}>{item.text}</Skill>
      ))}
    </>
  );
};

export default MentorSkill;