import { Card, CardHeader, Box, Typography, Avatar, Stack, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Pacientes() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const getPacientes = () => {
      fetch(`http://localhost:8080/api/pacientes`)
        .then((res) => res.json())
        .then((res) => setPacientes(res));
    };
    getPacientes();
  }, []);

  return (
    <Card>
      <CardHeader title="Pacientes" subheader="Todos los pacientes registrados:" />
      {pacientes.map((paciente) => (
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <AccountStyle key={paciente.matricula}>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Nombre: {paciente.nombres}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Matricula: {paciente.matricula}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Apellidos: {paciente.apellidos}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Peso: {paciente.peso}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Altura: {paciente.altura}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                IMC: {paciente.imc}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Carrera: {paciente.carrera}
              </Typography>
            </Box>
          </AccountStyle>
        </Box>
      ))}
    </Card>
  );
}
