import { filter } from "lodash";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";

import Page from "../components/Page";
import Scrollbar from "../components/ScrollBar";
import SearchNotFound from "../components/SearchNotFound";
import {
  EmployeesListHead,
  EmployeesListToolbar,
  EmployeesMoreMenu,
} from "../components/dashboard/employees";
import { Order } from "../components/dashboard/employees/EmployeesListHead";
import EmployeeForm from "../components/dashboard/employees/EmployeeForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteEmployeeAsync,
  deleteEmployeesAsync,
  selectEmployee,
  selectEmployees,
  selectError,
  setEmployeeInQuestion,
} from "../store/slices/employee";
import Modal, { ModalAction, ModalProps } from "../components/Modal";
import { Employee } from "../models/employee";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "title", label: "Title", alignRight: false },
  { id: "phoneNumber", label: "Ph. Number", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "" },
];

const descendingComparator = (a: any, b: any, orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order: Order, orderBy: string) => {
  return order === Order.desc
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

const applySortFilter = (array: Array<any>, comparator: any, query: any) => {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (employee: Employee) =>
        JSON.stringify(employee).toLowerCase().indexOf(query.toLowerCase()) !==
        -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const Employees = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(Order.asc);
  const [selected, setSelected] = useState<Array<string>>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [message, setMessage] = useState<string>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const employees = useAppSelector(selectEmployees);
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectEmployee);
  const [openEmployeeFormModal, setOpenEmployeeFormModal] = useState(false);
  const [
    openEmployeeDeleteConfirmationModal,
    setOpenEmployeeDeleteConfirmationModal,
  ] = useState(false);
  const error = useAppSelector(selectError);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === Order.asc;
    setOrder(isAsc ? Order.desc : Order.asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelectedItems = employees.map((n: Employee) => n._id as string);
      setSelected(newSelectedItems);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: Array<string> = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const handleDeleteUser = async () => {
    setOpenEmployeeDeleteConfirmationModal(
      false
    ) as never as ModalAction["action"];
    await dispatch(deleteEmployeeAsync(employee?._id as string));
    if (error) {
      setMessage(error);
    } else {
      setMessage("Employee deleted successfully!");
    }
    setSnackbarOpen(true);
  };

  const handleDeleteMultipleUsers = async () => {
    await dispatch(deleteEmployeesAsync(selected));
    if (error) {
      setMessage(error);
    } else {
      setSelected([]);
      setMessage("Employees deleted successfully!");
    }
    setSnackbarOpen(true);
  };

  const filteredUsers = applySortFilter(
    employees,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Employees">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(setEmployeeInQuestion({ employee: undefined }));
              setOpenEmployeeFormModal(true);
            }}
            startIcon={<AddIcon />}
          >
            Add New Employee
          </Button>
        </Stack>

        <Card>
          <EmployeesListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleMultipleUsersDelete={handleDeleteMultipleUsers}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <EmployeesListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employees.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const {
                        _id,
                        name,
                        surname,
                        phoneNumber,
                        address,
                        title,
                      } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={name}
                                src="https://minimal-kit-react.vercel.app/static/mock-images/avatars/avatar_default.jpg"
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name} {surname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="right">
                            <EmployeesMoreMenu
                              handleEdit={() => {
                                dispatch(
                                  setEmployeeInQuestion({ employee: row })
                                );
                                setOpenEmployeeFormModal(true);
                              }}
                              handleDelete={() => {
                                dispatch(
                                  setEmployeeInQuestion({ employee: row })
                                );
                                setOpenEmployeeDeleteConfirmationModal(true);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {openEmployeeFormModal && (
        <EmployeeForm
          open={openEmployeeFormModal}
          setOpen={setOpenEmployeeFormModal}
          setMessage={setMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      )}
      <Modal
        title="Are you sure?"
        actions={[
          {
            title: "No",
            action: () =>
              setOpenEmployeeDeleteConfirmationModal(
                false
              ) as never as ModalAction["action"],
          },
          {
            title: "Yes",
            action: handleDeleteUser,
          },
        ]}
        open={openEmployeeDeleteConfirmationModal}
        setOpen={
          setOpenEmployeeDeleteConfirmationModal as never as ModalProps["setOpen"]
        }
      >
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {employee?.name}?
        </DialogContentText>
      </Modal>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          message={message}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity={error ? "error" : "success"} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </Page>
  );
}

export default Employees;
