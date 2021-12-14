import { Card, CardHeader, Box } from '@mui/material';
import FormCita from './FormCita';
// ---------------------------------------------------------------------
export default function FormNuevaCita() {
  return (
    <Card>
      <CardHeader title="Citar paciente" subheader="Especifica toda la informacion informacion" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormCita />
      </Box>
    </Card>
  );
}
