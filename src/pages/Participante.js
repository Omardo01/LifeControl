import { useFormik } from 'formik';
import { useState, useEffect, Suspense } from 'react';
// material
import { Container, Card, Box, Typography, Grid, Avatar } from '@mui/material';
import Cookies from 'js-cookie';
// components
import Page from '../components/Page';
//
import ControlDiario from '../components/participantes/ControlDiario';
import ProductListParticipante from '../components/participantes/ProductListParticipante';

// ----------------------------------------------------------------------

export default function Participante() {
  const [openFilter, setOpenFilter] = useState(false);
  const [datosPersona, setDatosPersona] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getPersona = () => {
      fetch(`http://localhost:8080/api/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosPersona(res[0]));
    };
    const getProductos = () => {
      fetch(`http://localhost:8080/api/productos/todos`)
        .then((res) => res.json())
        .then((res) => setProductos(res));
    };
    getProductos();
  }, []);

  console.log(datosPersona);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Usuario | Life Control">
      <Container maxWidth="xl">
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenido: {datosPersona.nombres} {datosPersona.apellidos}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <ControlDiario />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <h1>Menus de hoy: </h1>
          </Grid>
          <Grid item xs={12} md={15} lg={12}>
            <ProductListParticipante productos={productos} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
