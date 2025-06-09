import React from "react";
import { Paper, Typography, Grid, Stack, Avatar, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import type { Candidate } from "../../types/models";

interface CandidateDetailsProps {
  selectedCandidate: Candidate;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({
  selectedCandidate,
}) => {
  const { t } = useTranslation();
  return (
    <Paper sx={{ p: 3, mb: 2 }} elevation={2}>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {selectedCandidate.candidate_name || "—"}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {t("candidate")}
          </Typography>
        </Box>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {t("email")}
            </Typography>
          </Stack>
          <Typography variant="body1">
            {selectedCandidate.email || "—"}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PublicIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {t("country")}
            </Typography>
          </Stack>
          <Typography variant="body1">
            {selectedCandidate.country || "—"}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CakeIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {t("birthDate")}
            </Typography>
          </Stack>
          <Typography variant="body1">
            {selectedCandidate.birth_date || "—"}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LanguageIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              {t("nativeLanguage")}
            </Typography>
          </Stack>
          <Typography variant="body1">
            {selectedCandidate.native_language || "—"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CandidateDetails;
