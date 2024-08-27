import { Toaster } from 'react-hot-toast';
import { AppToast } from './Toast';

const AppToaster = () => {
  return (
    <Toaster toastOptions={{ duration: Infinity }}>
      {toast => <AppToast toast={toast} />}
    </Toaster>
  );
};

export default AppToaster;
