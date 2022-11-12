import { renderWithProviders } from '../../../../test/testStore';
import { SkillChips } from './SkillChips';

describe('<MentorChips />', () => {
  const items: Array<string> = [
    'Juggling',
    'Bowling',
    'Belly dancing',
    'Hiking',
    'Snowboarding',
    'Sailing',
    'Soccer',
    'Communication',
    'Horseback riding',
    'Fax machinge repairing',
  ];

  it('Mentor chips are rendered correctly', () => {
    const { getAllByRole } = renderWithProviders(<SkillChips skills={items} />);

    // There will be pills + show-more button
    expect(getAllByRole('button').length).toBe(11);
  });

  it('Selecting skill will change the state', async () => {
    const { getByText, store, user } = renderWithProviders(
      <SkillChips skills={items} />,
    );

    const skillPill = getByText(items[0]);

    await user.click(skillPill);

    expect(
      store.getState().mentorsFilter.selectedSkills.includes(items[0]),
    ).toEqual(true);
  });

  it('Selected chips have different bg', () => {
    const { getByText } = renderWithProviders(<SkillChips skills={items} />, {
      preloadedState: {
        mentorsFilter: { selectedSkills: [items[0]], searchString: '' },
      },
    });

    const selectedSkillPill = getByText(items[0]);
    const notSelectedSkillPill = getByText(items[1]);

    const selectedBg = getComputedStyle(selectedSkillPill);
    const notSelectedBg = getComputedStyle(notSelectedSkillPill);

    expect(selectedBg).not.toEqual(notSelectedBg);
  });
});
