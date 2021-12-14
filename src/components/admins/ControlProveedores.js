import { Card, CardHeader, Box, Typography, Avatar, Container, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Page from '../Page';
import FormNuevoProveedor from './FormNuevoProveedor';
// ----------------------------------------------------------------------

export default function ControlProveedores() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();

  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const getProveedores = () => {
      fetch(`http://localhost:8080/api/provee/pro`)
        .then((res) => res.json())
        .then((res) => setProveedores(res));
    };
    getProveedores();
    console.log(proveedores);
  }, []);

  const handleDelete = (matricula) => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch(`http://localhost:8080/api/provee/${matricula}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  return (
    <Page title="Proveedores | Admin">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Card>
              <CardHeader
                title="Registrar Proveedor"
                subheader="Proporciona los datos al proveedor para ingresar a la plataforma"
              />
              <FormNuevoProveedor />
            </Card>
            <Card>
              <CardHeader title="Proveedores" subheader="Todos los Proveedores registrados:" />
              {proveedores.map((proveedor) => (
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <AccountStyle>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                        Nombre: {proveedor.nombre_proveedor}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Matricula: {proveedor.matricula}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Ganancias: {proveedor.ganancias}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Pass: {proveedor.password}
                      </Typography>
                      <br />
                      <LoadingButton
                        fullWidth
                        size="small"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          handleDelete(proveedor.matricula);
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
