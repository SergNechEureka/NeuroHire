import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography
} from "@mui/material";
import "./css/dark.css";

type CVMeta = {
  cv_id: string;
  filename: string;
  filetype?: string | null;
  filesize?: number | null;
  candidate_name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  birth_date?: string | null;
  position_applied?: string | null;
  uploaded_at: string;
  updated_at?: string | null;
  status: string;
  source?: string | null;
  parsed_ok?: boolean | null;
  parsing_info?: string | null;
  language?: string | null;
  file_path?: string | null;
};

const API_URL = process.env.REACT_APP_API_URL as string;

const MetaTable: React.FC = () => {
  const [meta, setMeta] = useState<CVMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    axios.get<CVMeta[]>(API_URL+'all_cvs')
      .then(res => {
        if (!ignore) setMeta(res.data);
      })
      .catch(err => console.error(err))
      .then(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </div>
  );

  return (
    <TableContainer component={Paper} style={{ marginTop: "2rem" }}>
      <Typography variant="h6" style={{ padding: "1rem" }}>CV Metadata</Typography>
      <Table className="table-metadata">
        <TableHead>
          <TableRow>
            <TableCell>cv_id</TableCell>
            <TableCell>filename</TableCell>
            <TableCell>candidate_name</TableCell>
            <TableCell>email</TableCell>
            <TableCell>phone</TableCell>
            <TableCell>country</TableCell>
            <TableCell>birth_date</TableCell>
            <TableCell>position_applied</TableCell>
            <TableCell>uploaded_at</TableCell>
            <TableCell>status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meta.map(row => (
            <TableRow key={row.cv_id}>
              <TableCell>{row.cv_id}</TableCell>
              <TableCell>{row.filename}</TableCell>
              <TableCell>{row.candidate_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.birth_date}</TableCell>
              <TableCell>{row.position_applied}</TableCell>
              <TableCell>{row.uploaded_at}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetaTable;