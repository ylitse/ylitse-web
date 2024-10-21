import { useState } from 'react';

type Confirmation = {
  text: string;
  title: string;
};

export const useConfirm = () => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<Confirmation>({
    text: '',
    title: '',
  });

  const hide = () => {
    setIsDisplayed(false);
    setConfirmation({ text: '', title: '' });
  };

  const show = ({ text, title }: Confirmation) => {
    setConfirmation({ text, title });
    setIsDisplayed(true);
  };

  return { confirmation, hide, isDisplayed, show };
};
