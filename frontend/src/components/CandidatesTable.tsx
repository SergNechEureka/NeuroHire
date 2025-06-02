import React, { useState } from "react";
import type { Candidate } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "react-i18next";
import UploadDialog from "./UploadDialog";

import {
  Table,
  Toolbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
  Tooltip,
  Button
} from "@mui/material";

interface CandidatesTableProps {
  candidates: Candidate[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDelete: (ids: string[]) => void;
  onDeleteOne: (id: string) => void;
  onRowClick: (candidate: Candidate) => void;
  loading: boolean;
  fetchData: () => void;
}

type Props = CandidatesTableProps;

export default function CandidatesTable({
  candidates,
  selectedIds,
  onSelect,
  onSelectAll,
  onDeselectAll,
  onDelete,
  onRowClick,
  onDeleteOne,
  loading,
  fetchData
}: Props) {

  const [uploadOpen, setUploadOpen] = useState(false);
  const { t } = useTranslation();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
    <Paper sx={{ m: 3, p: 2 }}>
        <Toolbar>
                  <Button
          variant="contained"
          onClick={() => setUploadOpen(true)}
          startIcon={<CloudUploadIcon />}
        >
          {t("upload")}
        </Button>
        </Toolbar>
    </Paper>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <Tooltip title="Select all">
            <IconButton onClick={onSelectAll}>
              <SelectAllIcon />
            </IconButton>
          </Tooltip>
        <Tooltip title="Deselect all">
          <IconButton onClick={onDeselectAll}>
            <DeselectIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete selected">
          <IconButton
            onClick={() => onDelete(selectedIds)}
            color="error"
            disabled={selectedIds.length === 0}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                key={candidate.candidate_id}
                hover
                selected={selectedIds.includes(candidate.candidate_id)}
                onClick={() => onRowClick(candidate)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(candidate.candidate_id)}
                    onChange={e => {
                      e.stopPropagation();
                      onSelect(candidate.candidate_id);
                    }}
                  />
                </TableCell>
                <TableCell>{candidate.candidate_name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.country}</TableCell>
                <TableCell>{candidate.birth_date}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Удалить"
                    color="error"
                    onClick={() => onDeleteOne(candidate.candidate_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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