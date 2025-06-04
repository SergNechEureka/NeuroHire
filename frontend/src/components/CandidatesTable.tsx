import * as React from "react";
import type { Candidate } from "../types/models";

import type {
  EnhancedTableToolbarProps,
  HeadCell,
  EnhancedTableProps,
  Order,
} from "../types/common";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";
import UploadDialog from "./UploadDialog";
import { alpha } from "@mui/material/styles";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";

interface CandidatesTableProps {
  candidates: Candidate[];
  selectedIds: string[];
  order: Order;
  orderBy: keyof Candidate;
  handleSelect: (id: string) => void;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (ids: string[]) => void;
  handleDeleteOne: (id: string) => void;
  handleRowClick: (candidate: Candidate) => void;
  loading: boolean;
  fetchData: () => void;
  getComparator: (
    order: Order,
    orderBy: keyof Candidate
  ) => (a: Candidate, b: Candidate) => number;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Candidate
  ) => void;
}

type Props = CandidatesTableProps;

function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps & {
    onUploadClick: () => void;
    onDeleteClick: () => void;
  }
) {
  const { numSelected, onUploadClick, onDeleteClick } = props;
  const { t } = useTranslation();

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t("candidates")} {t("selected")}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t("candidates")}
        </Typography>
      )}
      <Button
        sx={{ width: 155, alignSelf: "center" }}
        variant="contained"
        onClick={onUploadClick}
        startIcon={<CloudUploadIcon />}
      >
        {t("upload")}
      </Button>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={onDeleteClick}
            color="error"
            disabled={numSelected === 0}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function headCells(t: ReturnType<typeof useTranslation>["t"]): HeadCell[] {
  return [
    {
      id: "candidate_name",
      numeric: false,
      disablePadding: true,
      label: t("name"),
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: t("email"),
    },
    {
      id: "country",
      numeric: false,
      disablePadding: true,
      label: t("country"),
    },
    {
      id: "birth_date",
      numeric: false,
      disablePadding: true,
      label: t("birthDate"),
    },
    {
      id: "native_language",
      numeric: false,
      disablePadding: true,
      label: t("nativeLanguage"),
    },
  ];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAll, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Candidate) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells(t).map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CandidatesTable({
  candidates,
  handleSelect,
  handleSelectAll,
  handleRequestSort,
  handleDelete,
  handleRowClick,
  handleDeleteOne,
  loading,
  fetchData,
  getComparator,
  selectedIds,
  order,
  orderBy,
}: Props) {
  const { t } = useTranslation();

  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const visibleRows = React.useMemo(
    () =>
      [...candidates]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [candidates, order, orderBy, page, rowsPerPage, getComparator]
  );

  if (loading) return <div>Loading...</div>;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - candidates.length) : 0;

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChangePage = ( _event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selectedIds.length}
            onUploadClick={() => setUploadOpen(true)}
            onDeleteClick={() => handleDelete(selectedIds)}
          />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selectedIds.length}
                order={order}
                orderBy={orderBy}
                onSelectAll={handleSelectAll}
                onRequestSort={handleRequestSort}
                rowCount={candidates.length}
              />
              <TableBody>
                {visibleRows.map((candidate, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={candidate.candidate_id}
                      hover
                      aria-checked={selectedIds.includes(
                        candidate.candidate_id
                      )}
                      selected={selectedIds.includes(candidate.candidate_id)}
                      onClick={() => handleRowClick(candidate)}
                      role="checkbox"
                      sx={{ cursor: "pointer" }}
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selectedIds.includes(candidate.candidate_id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelect(candidate.candidate_id);
                          }}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {candidate.candidate_name}
                      </TableCell>
                      <TableCell padding="none">{candidate.email}</TableCell>
                      <TableCell padding="none">{candidate.country}</TableCell>
                      <TableCell padding="none">
                        {candidate.birth_date}
                      </TableCell>
                      <TableCell padding="none">
                        {candidate.native_language}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label={t("delete")}
                          color="error"
                          onClick={() =>
                            handleDeleteOne(candidate.candidate_id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={candidates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploadComplete={() => {
          setUploadOpen(false);
          fetchData();
        }}
      />
    </div>
  );
}
