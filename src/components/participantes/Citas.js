import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
// ----------------------------------------------------------------------

export default function Citas() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getCitas = () => {
      fetch(`http://localhost:8080/api/citas/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setCitas(res));
    };
    getCitas();
  }, []);
  return (
    <Card>
      <CardHeader title="Citas" subheader="Estas son las citas que tienes" />
      {citas.map((cita) => (
        <Box sx={{ p: 3, pb: 3 }} dir="ltr">
          <AccountStyle>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Doctor: {cita.nombre}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fecha: {cita.fecha}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lugar: {cita.lugar}
              </Typography>
            </Box>
          </AccountStyle>
        </Box>
      ))}
    </Card>
  );
}
