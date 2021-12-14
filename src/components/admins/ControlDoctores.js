import { Card, CardHeader, Box, Typography, Avatar, Container, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Page from '../Page';
import FormNuevoDoctor from './FormNuevoDoctor';
// ----------------------------------------------------------------------

export default function ControlDoctores() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();

  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    const getDoctores = () => {
      fetch(`http://localhost:8080/api/doctores/doc`)
        .then((res) => res.json())
        .then((res) => setDoctores(res));
    };
    getDoctores();
  }, []);

  const handleDelete = (matricula) => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch(`http://localhost:8080/api/doctores/${matricula}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  return (
    <Page title="Doctores | Admin">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Card>
              <CardHeader
                title="Registrar Doctor"
                subheader="Proporciona los datos al doctor para ingresar a la plataforma"
              />
              <FormNuevoDoctor />
            </Card>
            <Card>
              <CardHeader title="Doctores" subheader="Todos los Doctores registrados:" />
              {doctores.map((doctor) => (
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <AccountStyle>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                        Nombre: {doctor.nombre}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Matricula: {doctor.matricula}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Pass: {doctor.password}
                      </Typography>
                      <br />
                      <LoadingButton
                        fullWidth
                        size="small"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          handleDelete(doctor.matricula);
                          window.location.reload();
                        }}
                      >
                        Eliminar
                      </LoadingButton>
                    </Box>
                  </AccountStyle>
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
