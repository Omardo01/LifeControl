import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import FormSubirPlatillo from '../../proveedores/FormSubirPlatillo';
// ----------------------------------------------------------------------
export default function AppWebsiteVisits() {
  return (
    <Card>
      <CardHeader title="Dar de alta un producto" subheader="Especifica toda su informacion" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <FormSubirPlatillo />
      </Box>
    </Card>
  );
}
