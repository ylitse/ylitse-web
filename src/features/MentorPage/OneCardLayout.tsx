import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import React from 'react';

/** Move to components */

type CardProps = React.PropsWithChildren<{
  headLine: string;
	children: React.ReactNode;
}>;

// eslint-disable-next-line react/prop-types
const OneCardLayout: React.FC<PropsWithChildren<CardProps>> = ({ headLine, children }) => {
  return (
    <OneCard>
      <CardHeader>{headLine}</CardHeader>
			{children}
    </OneCard>
  );
};

const OneCard = styled.div`
  flex: 0 0 auto;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin: 0;
  height: fit-content;
`;

const CardHeader = styled.div`
  flex: 1;
  background-color: #43bfff;
  border-radius: 10px;
  max-height: 80px;
  height: 80px;
  color: #1c325d;
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OneCardLayout;
