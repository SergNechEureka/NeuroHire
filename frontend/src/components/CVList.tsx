import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

interface CVListProps {
  cvs: any[];
}

const CVList: React.FC<CVListProps> = ({ cvs }) => {
  if (!cvs || cvs.length === 0)
    return <Typography variant="body2">No CVs available</Typography>;

  return (
    <List>
      {cvs.map((cv) => (
        <React.Fragment key={cv.cv_id}>
          <ListItem>
            <ListItemText
              primary={cv.filename}
              secondary={cv.language}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default CVList;