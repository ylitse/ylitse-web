import { renderWithProviders } from '@/test/testStore';
import MentorsFilter from '.';

describe('<MentorsFilter />', () => {
  it('Can change the searchString', async () => {
    const { getByRole, user, store, getByDisplayValue } = renderWithProviders(
      <MentorsFilter />,
    );

    const inputField = getByRole('textbox');

    await user.click(inputField);
    const changed = 'Hello';
    await user.keyboard(changed);

    expect(store.getState().mentorsFilter.searchString).toBe(changed);
    expect(getByDisplayValue(changed)).toBeInTheDocument();
  });
});
