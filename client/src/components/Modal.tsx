import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export interface ModalAction {
  title: string;
  action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ModalProps {
  open: boolean;
  title: string;
  actions: Array<ModalAction>;
  setOpen: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  children: React.ReactNode;
}

const Modal = ({
  open,
  title,
  actions,
  setOpen,
  children,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.map((action) => (
          <Button key={`modal-title-${action.title}`} onClick={action.action}>
            {action.title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
export default Modal;