import React from "react";
import { Drawer, Typography, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Candidate, CVExperience, CVSkill } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  experiences: CVExperience[];
  skills: CVSkill[];
};

export default function CandidateDetailsDrawer({
  open,
  onClose,
  candidate,
  experiences,
  skills,
}: Props) {
  if (!candidate) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 400, padding: 24 }}>
        <Typography variant="h6">{candidate.candidate_name}</Typography>
        <Typography variant="body2">{candidate.email}</Typography>
        <Typography variant="body2">{candidate.country}</Typography>
        <Typography variant="body2">{candidate.birth_date}</Typography>
        <Divider style={{ margin: "16px 0" }} />
        <Typography variant="subtitle1">Experience</Typography>
        <List>
          {experiences.map(exp => (
            <ListItem key={exp.id}>
              <ListItemText
                primary={`${exp.position || ""} @ ${exp.company || ""}`}
                secondary={`${exp.start_date} - ${exp.end_date}: ${exp.description}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider style={{ margin: "16px 0" }} />
        <Typography variant="subtitle1">Skills</Typography>
        <List>
          {skills.map(skill => (
            <ListItem key={skill.id}>
              <ListItemText
                primary={skill.skill_name}
                secondary={skill.description}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}