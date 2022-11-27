import { mapSkills } from './mentorPageApi';

const mentors = {
  user_id_1: {
    skills: ['Belly dancing', 'ATK'],
    mentorId: '',
    buddyId: '',
    gender: '',
    communication_channels: [],
    name: '',
    age: 21,
    region: '',
    story: '',
    languages: [],
    is_vacationing: true,
    status_message: '',
  },
  user_id_2: {
    skills: ['Juggling', 'Yoga'],
    mentorId: '',
    buddyId: '',
    gender: '',
    communication_channels: [],
    name: '',
    age: 21,
    region: '',
    story: '',
    languages: [],
    is_vacationing: true,
    status_message: '',
  },
  user_id_4: {
    skills: ['Belly dancing', 'Juggling'],
    mentorId: '',
    buddyId: '',
    gender: '',
    communication_channels: [],
    name: '',
    age: 21,
    region: '',
    story: '',
    languages: [],
    is_vacationing: true,
    status_message: '',
  },
  user_id_5: {
    skills: ['Juggling', 'Frisbee throwing'],
    mentorId: '',
    buddyId: '',
    gender: '',
    communication_channels: [],
    name: '',
    age: 21,
    region: '',
    story: '',
    languages: [],
    is_vacationing: true,
    status_message: '',
  },
};

describe('mapSkills-function', () => {
  it('orders skills based on rarity', () => {
    const skills = mapSkills(mentors, []);
    expect(skills[0]).toBe('Juggling');
    expect(skills[1]).toBe('Belly dancing');
  });

  it('selected skills always first', () => {
    const skills = mapSkills(mentors, ['Frisbee throwing']);
    expect(skills[0]).toBe('Frisbee throwing');
  });

  it('if selected skill that is not on any mentor, it wont show up', () => {
    const skills = mapSkills(mentors, ['Non existing']);
    expect(skills[0]).not.toBe('Frisbee throwing');
    expect(skills.includes('Non existing')).toBe(false);
  });

  it('all skills are mapped once', () => {
    const skills = mapSkills(mentors, []);
    expect(skills.length).toBe(5);
  });

  it('if no mentors, no skills', () => {
    const skills = mapSkills({}, []);
    expect(skills.length).toBe(0);
  });

  it('if no skills, no skills', () => {
    const skills = mapSkills(
      Object.values(mentors).reduce((mentors, current) => {
        const updated = { ...current, skills: [] };
        return { ...mentors, [current.buddyId]: updated };
      }, {}),
      [],
    );
    expect(skills.length).toBe(0);
  });
});
