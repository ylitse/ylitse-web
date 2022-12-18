import Navigation from '@/features/Navigation';
import Spinner from './components/Spinner';
import styled from 'styled-components';

import useAuthenticated from './hooks/useAuthenticated';

const App = () => {
  const isAuthenticated = useAuthenticated();

  return isAuthenticated ? (
    <AppWrapper>
      <Navigation />
    </AppWrapper>
  ) : (
    <Spinner variant="large" />
  );
};

const AppWrapper = styled.div`
  overflow: hidden;
`;

export default App;
