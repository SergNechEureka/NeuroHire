import React from "react";
import { Box, Grid, Paper, Breadcrumbs, Link, Typography } from "@mui/material";

import CandidateNavigation from "./CandidateNavigation";
import CandidateDetails from "./CandidateDetails";
import CandidateExperienceTable from "./CandidateExperienceTable";
import CandidateSkillsTable from "./CandidateSkillsTable";

interface CandidatePageLayoutProps {
  onBack: () => void;
  candidateId: string;
}

const CandidatePageLayout: React.FC<CandidatePageLayoutProps> = ({
  onBack,
  candidateId,
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
            <CandidateNavigation selectedCandidateId={candidateId} />
          </Grid>
          <Grid item xs={12} md={9}>
            <CandidateDetails candidateId={candidateId} />
            <Box sx={{ mt: 2 }}>
              <CandidateExperienceTable candidateId={candidateId} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <CandidateSkillsTable candidateId={candidateId} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CandidatePageLayout;
