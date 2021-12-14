import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
// ----------------------------------------------------------------------

export default function Historial() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();
  const compras = [
    {
      Platillo: 'Chuleta',
      Fecha: '2021/11/3',
      Proveedor: 'Cafeteria Express',
      Calorias: '120.4',
      Precio: '99.99'
    },
    {
      Platillo: 'Papas',
      Fecha: '2021/11/3',
      Proveedor: 'Cafeteria Express',
      Calorias: '127.4',
      Precio: '99.99'
    }
  ];
  return (
    <Card>
      <CardHeader title="Historial" subheader="Estas son tus platillos consumidos" />
      {compras.map((compra) => (
        <Box sx={{ p: 3, pb: 3 }} dir="ltr">
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Nombre de platillo: {compra.Platillo}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fecha: {compra.Fecha}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Proveedor: {compra.Proveedor}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Calorias: {compra.Calorias}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Precio: $ {compra.Precio}
              </Typography>
              <LoadingButton
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                color="warning"
                onClick={() => {
                  navigate('/', { replace: true });
                }}
              >
                Eliminar
              </LoadingButton>
            </Box>
          </AccountStyle>
        </Box>
      ))}
    </Card>
  );
}
