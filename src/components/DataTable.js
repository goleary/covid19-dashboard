import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  lighten,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { formatNumber, formatPercent } from "../utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "state",
    numeric: false,
    label: "State",
    alwayShow: true
  },
  { id: "tests", numeric: true, label: "Total Tests" },
  {
    id: "delta1Tests",
    numeric: true,
    label: "New Tests (24h)"
  },
  {
    id: "delta7Tests",
    numeric: true,
    label: "New Tests (7d)"
  },
  {
    id: "positive",
    numeric: true,
    label: "Total Confirmed"
  },
  {
    id: "delta1Positive",
    numeric: true,
    label: "New Confirmed (24h)"
  },
  {
    id: "delta7Positive",
    numeric: true,
    label: "New Confirmed (7d)"
  },
  {
    id: "positiveRate",
    numeric: true,
    label: "Positive Rate",
    percent: true
  },
  {
    id: "positiveRate1",
    numeric: true,
    label: "Positive Rate (24h)",
    percent: true
  },
  {
    id: "positiveRate7",
    numeric: true,
    label: "Positive Rate (7d)",
    percent: true
  },
  { id: "death", numeric: true, label: "Deaths" },
  {
    id: "delta1Death",
    numeric: true,
    label: "New Deaths (24h)"
  },
  {
    id: "delta7Death",
    numeric: true,
    label: "New Deaths (7d)"
  }
];

function EnhancedTableHead({
  classes,
  order,
  orderBy,
  rowCount,
  onRequestSort,
  fields,
  sortField
}) {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell =>
          headCell.alwayShow ||
          !fields ||
          fields.indexOf(headCell.id) !== -1 ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <span className={classes.bold}>{headCell.label}</span>
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : null
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStylesRow = makeStyles(theme => ({
  totals: {
    backgroundColor: "lightgray"
  }
}));

const StateRow = ({ row, fields }) => {
  const classes = useStylesRow();
  return (
    <TableRow className={clsx(!row.state ? classes.totals : null)}>
      {headCells.map(headCell =>
        headCell.alwayShow || !fields || fields.indexOf(headCell.id) !== -1 ? (
          <TableCell align={headCell.numeric ? "right" : "left"}>
            {headCell.percent
              ? formatPercent(row[headCell.id])
              : headCell.numeric
              ? formatNumber(row[headCell.id])
              : row[headCell.id]}
            {headCell.alwayShow && !row[headCell.id] ? "USA" : null}
          </TableCell>
        ) : null
      )}
    </TableRow>
  );
};
const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "5px"
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  bold: {
    fontWeight: 600
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {},
  totals: {
    backgroundColor: "lightgray"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function EnhancedTable({
  rows,
  totals,
  rowsPerPage = 50,
  fields = null,
  sortField = "state"
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState(
    sortField === "state" ? "asc" : "desc"
  );
  const [orderBy, setOrderBy] = React.useState(sortField);
  const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    if (orderBy === property) {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
    }
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              fields={fields}
              sortField={sortField}
            />
            <TableBody>
              {totals ? <StateRow row={totals} fields={fields} /> : null}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return <StateRow key={index} row={row} fields={fields} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPageOptions={[rowsPerPage]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
    </MuiThemeProvider>
  );
}
