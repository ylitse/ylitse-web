import styled from 'styled-components';

type Props = { url: string; children: React.ReactNode };

const Link = ({ url, children }: Props) => {
  return (
    <Container href={url} target="_blank">
      {children}
    </Container>
  );
};

const Container = styled.a`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  text-decoration: none;
`;

export default Link;
