import 'whatwg-fetch';

// https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            // mocked function
          }),
      },
      t: (str: string) => str,
    };
  },
  Trans: ({ children }) => children,
}));
