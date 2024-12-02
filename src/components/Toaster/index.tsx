import { Toaster } from 'react-hot-toast';
import { AppToast } from './Toast';

const AppToaster = () => {
  return (
    <Toaster
      toastOptions={{
        duration: Infinity,
        success: {
          duration: 4000,
        },
      }}
    >
      {toast => <AppToast toast={toast} />}
    </Toaster>
  );
};

export default AppToaster;
