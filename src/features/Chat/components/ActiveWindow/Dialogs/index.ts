import ConfirmationDialog from './ConfirmationDialog';
import ReportModal from './ReportModal';

export type ConfirmationDialogVariant = 'archive' | 'block' | 'restore';
export type DialogVariant = ConfirmationDialogVariant | 'report';

export { ConfirmationDialog, ReportModal };
