/**
 * @jest-environment jsdom
 */
import { act, render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { NavigationItem } from './types';
import NavigationItems from './NavigationItems';

describe('<NavigationItems/>', () => {
  const items: Array<NavigationItem> = [
    { text: 'Test Item', url: '/testitem' },
  ];

  it('NavigationItems is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <NavigationItems items={items} />
      </BrowserRouter>,
    );
    expect(queryAllByText('Test Item')).toBeTruthy();
  });

  it('NavigationItems change route', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <NavigationItems items={items} />
      </BrowserRouter>,
    );
    expect(global.window.location.pathname).toEqual('/');
    act(() => {
      // Find the link (perhaps using the text content)
      const link = queryByText('Test Item');
      // Click it
      link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(global.window.location.pathname).toEqual('/testitem');
  });
});
