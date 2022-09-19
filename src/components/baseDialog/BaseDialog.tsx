import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
  cancelButton?: boolean;
  acceptButtonHandler: () => void;
}

const BaseDialog: React.FC<DialogProps> = ({
  title,
  onClose,
  open,
  children,
  acceptButtonHandler,
  cancelButton = true,
  acceptButtonText = 'Yes',
  cancelButtonText = 'No',
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <Box padding={3.5}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          {title}
        </Typography>
        <Box marginY={2}>{children}</Box>
        <Box display="flex" justifyContent="center" columnGap={2} marginTop={3}>
          <Button
            variant="contained"
            color={cancelButton ? 'success' : 'primary'}
            size="small"
            onClick={acceptButtonHandler}
          >
            {acceptButtonText}
          </Button>
          {cancelButton && (
            <Button variant="contained" color="error" size="small" onClick={onClose}>
              {cancelButtonText}
            </Button>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default BaseDialog;
