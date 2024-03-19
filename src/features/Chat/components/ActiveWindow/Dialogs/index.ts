import ConfirmationDialog from './ConfirmationDialog';
import ReportDialog from './ReportDialog';
import ReportSuccessDialog from './ReportSuccessDialog';

export type ConfirmationDialogVariant = 'archive' | 'block' | 'restore';
export type DialogVariant = ConfirmationDialogVariant | 'report';

export { ConfirmationDialog, ReportDialog, ReportSuccessDialog };
