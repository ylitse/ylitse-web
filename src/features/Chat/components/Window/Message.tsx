import type { ChatFolder } from '../../chatPageApi';

import styled from 'styled-components';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

const toReadable = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

type Props = {
  folder: ChatFolder;
  content: string;
  isSent: boolean;
  time: string;
};

export const Message = ({ folder, content, isSent, time }: Props) => (
  <Container isSent={isSent}>
    <Bubble folder={folder} isSent={isSent}>
      <Content>{content}</Content>
    </Bubble>
    <Timestamp isSent={isSent}>{toReadable(time)}</Timestamp>
  </Container>
);

const Container = styled.div<{ isSent: boolean }>`
  align-items: ${({ isSent }) => (isSent ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
`;

const Bubble = styled.div<{ folder: ChatFolder; isSent: boolean }>`
  background-color: ${({ folder, isSent }) => {
    if (folder === 'ok') return isSent ? palette.blueLight : palette.blueWhite;
    if (folder === 'archived')
      return isSent ? palette.orangeLight : palette.orangeWhite;
    return isSent ? palette.redSalmon : palette.redWhite;
  }};
    isSent ? palette.blueLight : palette.blueWhite};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px 22px;
  text-align: left;
  word-break: break-word;
`;

const Content = styled(Text)`
  margin: 0;
`;

const Timestamp = styled(Text)<{ isSent: boolean }>`
  ${({ isSent }) => (isSent ? 'margin-right: 14px;' : 'margin-left: 14px;')}
  margin-bottom: 0;
  margin-top: 0;
  text-align: right;
`;
