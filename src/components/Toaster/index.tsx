import { Toaster } from 'react-hot-toast';
import { AppToast } from './Toast';

const AppToaster = () => {
  return <Toaster>{toast => <AppToast toast={toast} />}</Toaster>;
};

export default AppToaster;
