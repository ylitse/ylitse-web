// Libraries
import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types
import type { ChatBuddy } from '@/features/Chat/chatSlice';
import type { ConfirmationDialogVariant } from '../Dialogs';

// Variables
import { HIGH_ROW_HEIGHT } from '@/features/Chat/constants';
import { palette } from '@/components/variables';

// Components
import { Button, IconButton, StatusButton } from '@/components/Buttons';
import { ConfirmationDialog, ReportDialog } from '../Dialogs';
import Search from './Search';

type Props = {
  chat: ChatBuddy;
  tabletMode: boolean;
};

const Buttons = ({ chat, tabletMode }: Props) => {
  const { t } = useTranslation('chat');

  const [dialogVariant, setDialogVariant] =
    useState<ConfirmationDialogVariant>('archive');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (variant: ConfirmationDialogVariant) => {
    setDialogVariant(variant);
    setIsDialogOpen(true);
  };
  const closeDialog = () => setIsDialogOpen(false);

  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const openReportDialog = () => setIsReportDialogOpen(true);
  const closeReportDialog = () => setIsReportDialogOpen(false);

  const [isSearchShown, setIsSearchShown] = useState(false);
  const showSearch = () => setIsSearchShown(true);
  const hideSearch = () => setIsSearchShown(false);

  const [isTabletDropdownOpen, setIsTabletDropdownOpen] = useState(false);
  const closeTabletDropdown = () => setIsTabletDropdownOpen(false);

  return (
    <>
      {isDialogOpen && (
        <ConfirmationDialog
          variant={dialogVariant}
          chat={chat}
          close={closeDialog}
        />
      )}
      {isReportDialogOpen && (
        <ReportDialog buddyId={chat.buddyId} close={closeReportDialog} />
      )}

      {tabletMode ? (
        <Container>
          <IconButton
            variant="search"
            sizeInPx={24}
            onClick={() => {
              if (!isSearchShown) setIsTabletDropdownOpen(false);
              setIsSearchShown(!isSearchShown);
            }}
          />
          <IconButton
            variant="menuLines"
            sizeInPx={40}
            onClick={() => {
              if (!isTabletDropdownOpen) setIsSearchShown(false);
              setIsTabletDropdownOpen(!isTabletDropdownOpen);
            }}
          />
          {isSearchShown ? (
            <TabletDropdown>
              <Search hideSearch={hideSearch} />
            </TabletDropdown>
          ) : (
            isTabletDropdownOpen && (
              <Dropdown>
                {chat.status === 'ok' ? (
                  <>
                    <TabletStatusButton
                      onClick={() => {
                        closeTabletDropdown();
                        openDialog('archive');
                      }}
                      icon="archive"
                      text={t('header.archive')}
                    />
                    <TabletStatusButton
                      onClick={() => {
                        closeTabletDropdown();
                        openDialog('block');
                      }}
                      icon="block"
                      text={t('header.block')}
                    />
                  </>
                ) : (
                  <TabletStatusButton
                    onClick={() => {
                      closeTabletDropdown();
                      openDialog('restore');
                    }}
                    icon="return"
                    text={t('header.restore')}
                  />
                )}
                <TabletReportButton
                  onClick={() => {
                    closeTabletDropdown();
                    openReportDialog();
                  }}
                  leftIcon={'danger'}
                  sizeInPx={24}
                  text={{
                    color: 'purple',
                    text: t('header.report'),
                    variant: 'link',
                  }}
                />
              </Dropdown>
            )
          )}
        </Container>
      ) : isSearchShown ? (
        <Search hideSearch={hideSearch} />
      ) : (
        <Container>
          <IconButton variant="search" sizeInPx={24} onClick={showSearch} />
          {chat.status === 'ok' ? (
            <>
              <StatusButton
                onClick={() => openDialog('archive')}
                icon="archive"
                text={t('header.archive')}
              />
              <StatusButton
                onClick={() => openDialog('block')}
                icon="block"
                text={t('header.block')}
              />
            </>
          ) : (
            <StatusButton
              onClick={() => openDialog('restore')}
              icon="return"
              text={t('header.restore')}
            />
          )}
          <Button
            onClick={() => openReportDialog()}
            leftIcon={'danger'}
            sizeInPx={24}
            text={{
              color: 'purple',
              text: t('header.report'),
              variant: 'link',
            }}
          />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 30px;
`;

const Dropdown = styled.div`
  background-color: ${palette.white};
  border-radius: 0px 0px 4px 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  right: 40px;
  top: ${HIGH_ROW_HEIGHT};
  z-index: 5;
`;

const TabletDropdown = styled.div`
  position: absolute;
  right: 40px;
  top: ${HIGH_ROW_HEIGHT};
  z-index: 5;
`;

const TabletStatusButton = styled(StatusButton)`
  padding: 10px 40px 0px;
`;

const TabletReportButton = styled(Button)`
  padding: 10px 40px 10px;
`;

export default Buttons;
