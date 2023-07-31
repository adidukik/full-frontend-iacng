import { TableCell } from "@mui/material";
import { Button } from "@mui/material";
import { formatNumberWithSpaces } from "../../utils/formatNumberWithSpaces";

interface RegionsTableCellProps {
  rowData: number;
  showDiff?: boolean;
  onClick?: () => void;
  isButton?: boolean;
}

const RegionsTableCell = ({
  rowData,
  showDiff = false,
  onClick = null,
  isButton = false,
}: RegionsTableCellProps): JSX.Element => {
  if (isButton) {
    return (
      <TableCell align="right">
        <Button variant="contained" className="button" onClick={onClick}>
          {formatNumberWithSpaces(rowData)}
        </Button>
      </TableCell>
    );
  } else {
    return (
      <TableCell
        align="right"
        style={showDiff ? { color: rowData < 0 ? "red" : "green" } : null}
      >
        {formatNumberWithSpaces(rowData)}
      </TableCell>
    );
  }
};

export default RegionsTableCell;
