import { Card, CardHeader, Box, Typography, Avatar, Stack, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ActualizarParticipante from './ActualizarParticipante';

// ----------------------------------------------------------------------

export default function ListaParticipantes() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuarios = () => {
      fetch(`http://localhost:8080/api/us`)
        .then((res) => res.json())
        .then((res) => setUsuarios(res));
    };
    getUsuarios();
    console.log(usuarios);
  }, []);

  return (
    <Card>
      <CardHeader title="Usuarios" subheader="Todos los participantes registrados:" />
      {usuarios.map((usuario) => (
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <AccountStyle key={usuario.matricula}>
            <Avatar src="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Nombre: {usuario.nombres}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Apellidos: {usuario.apellidos}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Matricula: {usuario.matricula}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Peso: {usuario.peso}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Altura: {usuario.altura}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                IMC: {usuario.imc}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Carrera: {usuario.carrera}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Rol: {usuario.rol}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Efectivo: {usuario.Efectivo}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Calorias Recomendadas: {usuario.caloriasRecomendadas}
              </Typography>
              <ActualizarParticipante usuario={usuario} />
            </Box>
          </AccountStyle>
        </Box>
      ))}
    </Card>
  );
}
