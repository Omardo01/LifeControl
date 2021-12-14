import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import Cookies from 'js-cookie';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function DatosProveedor({ datosProveedor }) {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        title="Datos del proveedor:"
        subheader="Esperemos estes teniendo una buena experiencia."
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <AccountStyle>
          <Avatar src="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Nombre del proveedor: {datosProveedor.nombre_proveedor}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Matricula: {datosProveedor.matricula}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total de ganancias: {datosProveedor.ganancias}
            </Typography>
            <LoadingButton
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              color="warning"
              onClick={() => {
                navigate('/', { replace: true });
                Cookies.remove('matricula');
              }}
            >
              Salir
            </LoadingButton>
          </Box>
        </AccountStyle>
      </Box>
    </Card>
  );
}
