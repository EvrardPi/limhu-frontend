import { Alert, Snackbar } from "@mui/material";

export type SnackbarHandlerProps = {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function SnackbarHandler({
  isOpen,
  type,
  message,
  onClose,
}: SnackbarHandlerProps) {
  return (
    <>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={onClose}>
        <Alert severity={type} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
