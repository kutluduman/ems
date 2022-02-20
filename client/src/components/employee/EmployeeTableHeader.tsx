import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

export enum Order {
  asc = "asc",
  desc = "desc",
}

interface HeadLabel {
  id: string;
  label?: string;
  alignRight?: boolean;
}

interface EmployeeTableHeaderProps {
  order: Order;
  orderBy: string;
  rowCount: number;
  headLabel?: Array<HeadLabel>;
  numSelected: number;
  onRequestSort: (event: any, property: string) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const EmployeeTableHeader = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}: EmployeeTableHeaderProps) => {
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel &&
          headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? "right" : "left"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
export default EmployeeTableHeader;