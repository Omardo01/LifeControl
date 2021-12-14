import { Card, CardHeader, Box, Typography, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
//  import Cookies from 'universal-cookie';
// ----------------------------------------------------------------------

export default function ControlDiario() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  //  const cookies = new Cookies();
  const [datosPersona, setDatosPersona] = useState({});
  useEffect(() => {
    const getPersona = () => {
      fetch(`http://localhost:8080/api/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosPersona(res[0]));
    };
    getPersona();
  }, []);

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        title="Control Diario"
        subheader="Esperemos estes teniendo una buena experiencia."
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <AccountStyle>
          <Avatar src="https://i.pinimg.com/originals/c6/70/a8/c670a847963dd4d0f06d63a97a83142e.png" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {datosPersona.nombres} {datosPersona.apellidos}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Calorias diarias: {datosPersona.calorias}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Limite de calorias diarias: {datosPersona.calorias_recomendadas}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(datosPersona.calorias / datosPersona.calorias_recomendadas) * 100}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Dinero disponible: {datosPersona.efectivo}
            </Typography>
            <LoadingButton
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              color="warning"
              onClick={() => {
                Cookies.remove('matricula');
                navigate('/', { replace: true });
                window.location.reload();
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
