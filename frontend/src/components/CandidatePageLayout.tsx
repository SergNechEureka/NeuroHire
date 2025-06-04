import React from "react";
import { Box, Grid, Paper, Breadcrumbs, Link, Typography } from "@mui/material";

import CandidateNavigation from "./CandidateNavigation";
import CandidateDetails from "./CandidateDetails";
import CandidateExperienceTable from "./CandidateExperienceTable";
import CandidateSkillsTable from "./CandidateSkillsTable";
import type { Candidate } from "../types/models";

interface CandidatePageLayoutProps {
  onBack: () => void;
  candidate: Candidate;
}

const CandidatePageLayout: React.FC<CandidatePageLayoutProps> = ({
  onBack,
  candidate,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={onBack}
            sx={{ cursor: "pointer" }}
          >
            Candidates
          </Link>
          <Typography color="text.primary">Candidate</Typography>
        </Breadcrumbs>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <CandidateNavigation selectedCandidateId={candidate.candidate_id} />
          </Grid>
          <Grid item xs={12} md={9}>
            <CandidateDetails selectedCandidate={candidate} />
            <Box sx={{ mt: 2 }}>
              <CandidateExperienceTable
                selectedCandidateId={candidate.candidate_id}
                experience={[]}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <CandidateSkillsTable
                selectedCandidateId={candidate.candidate_id}
                skills={[]}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CandidatePageLayout;
