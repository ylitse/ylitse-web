import styled from 'styled-components';
import { palette } from '@/components/constants';
import { ROW_HEIGHT } from '@/features/Chat/constants';

export const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: ${ROW_HEIGHT};
  min-height: ${ROW_HEIGHT};
  padding-left: 40px;
`;
