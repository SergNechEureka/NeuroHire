import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CVMeta } from "../types";

type Props = {
  cvs: CVMeta[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onDelete: (ids: string[]) => void;
};

export default function CVList({ cvs, selectedIds, onSelect, onDelete }: Props) {
  return (
    <div>
      <IconButton onClick={() => onDelete(selectedIds)} disabled={selectedIds.length === 0} title="Delete selected">
        <DeleteIcon />
      </IconButton>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>File name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Uploaded</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cvs.map(cv => (
            <TableRow key={cv.cv_id} selected={selectedIds.includes(cv.cv_id)}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(cv.cv_id)}
                  onChange={() => onSelect(cv.cv_id)}
                />
              </TableCell>
              <TableCell>{cv.filename}</TableCell>
              <TableCell>{cv.filetype}</TableCell>
              <TableCell>{cv.uploaded_at}</TableCell>
              <TableCell>{cv.status}</TableCell>
              <TableCell>{cv.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}