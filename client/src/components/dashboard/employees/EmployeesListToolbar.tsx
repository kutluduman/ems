import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  DialogContentText,
} from "@mui/material";

import Modal, { ModalProps } from "../../Modal";
import { useState } from "react";


const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(
  ({ theme }: { [key: string]: any }) => ({
    width: 240,
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": { width: 320, boxShadow: theme.customShadows?.z8 },
    "& fieldset": {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  })
);

interface EmployeesListToolbarProps {
  numSelected: number;
  filterName: string;
  onFilterName: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleMultipleUsersDelete: Function;
}

const EmployeesListToolbar = ({
  numSelected,
  filterName,
  onFilterName,
  handleMultipleUsersDelete,
}: EmployeesListToolbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search employee..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={SearchIcon} sx={{ color: "text.disabled" }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={() => setOpen(true)}>
          <IconButton>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : null}

      <Modal
        title="Are you sure?"
        actions={[
          {
            title: "No",
            action: () => setOpen(false),
          },
          {
            title: "Yes",
            action: () => {
              setOpen(false);
              handleMultipleUsersDelete();
            },
          },
        ]}
        open={open}
        setOpen={setOpen as never as ModalProps["setOpen"]}
      >
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {numSelected} Employees?
        </DialogContentText>
      </Modal>
    </RootStyle>
  );
}

export default EmployeesListToolbar;
