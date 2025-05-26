import React, { useState } from "react";
import { useMetaTableData } from "./useMetaTableData";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Checkbox, Paper, IconButton, Toolbar, Typography, Button
} from "@mui/material";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadDialog from "./UploadDialog";


const MetaTable: React.FC = () => {
  const {
    meta,
    loading,
    selected,
    handleSelectAll,
    handleSelect,
    handleDeleteSelected,
    handleDeleteOne,
    fetchData
  } = useMetaTableData();

  const [uploadOpen, setUploadOpen] = useState(false);
  const { t } = useTranslation();

  if (loading) return <div>Loading...</div>;

  return (
    <Paper sx={{ m: 3, p: 2 }}>
      <Toolbar>
         <Typography variant="h5" sx={{ flex: 1 }}>Candidates</Typography>
        <Button
          variant="contained"
          onClick={() => setUploadOpen(true)}
          startIcon={<CloudUploadIcon />}
        >
          {t("upload")}
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={selected.length === 0}
          onClick={handleDeleteSelected}
        >
          {t("delete")}
        </Button>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < meta.length}
                  checked={meta.length > 0 && selected.length === meta.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>filename</TableCell>
              <TableCell>candidate_name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>phone</TableCell>
              <TableCell>country</TableCell>
              <TableCell>birth_date</TableCell>
              <TableCell>position_applied</TableCell>
              <TableCell>uploaded_at</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meta.map(row => (
              <TableRow
                key={row.cv_id}
                selected={selected.includes(row.cv_id)}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.cv_id)}
                    onChange={() => handleSelect(row.cv_id)}
                  />
                </TableCell>
                <TableCell>{row.filename}</TableCell>
                <TableCell>{row.candidate_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.birth_date}</TableCell>
                <TableCell>{row.position_applied}</TableCell>
                <TableCell>{row.uploaded_at}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Удалить"
                    color="error"
                    onClick={() => handleDeleteOne(row.cv_id)}
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
          fetchData(); // обновить таблицу после загрузки
        }}
      />
    </Paper>
  );
};

export default MetaTable;