import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Card, Box, Typography, Grid, Avatar } from '@mui/material';
// components
import Cookies from 'js-cookie';
import Page from '../components/Page';
//
import FormNuevaCita from '../components/doctores/FormNuevaCita';
import DatosDoctores from '../components/doctores/DatosDoctores';
import Pacientes from '../components/doctores/Pacientes';

// ----------------------------------------------------------------------

export default function Doctor() {
  const [openFilter, setOpenFilter] = useState(false);
  const [datosDoctor, setdatosDoctor] = useState({});
  useEffect(() => {
    const getDoctor = () => {
      fetch(`http://localhost:8080/api/doctores/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setdatosDoctor(res[0]));
    };
    getDoctor();
  }, []);
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
    <Page title="Doctores | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={5} md={0.5} lg={12}>
            <Card>
              <Box sx={{ p: 3, pb: 1, backgroundColor: '#535390' }} dir="ltr">
                <Avatar
                  alt="logo"
                  src="https://i.ibb.co/7S27Cg8/life-bg.png"
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="h3" sx={{ mb: 5 }}>
                  Life Control
                </Typography>
                <Typography variant="h6" sx={{ mb: 5 }}>
                  /Doctor/
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          {datosDoctor.nombre}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={4}>
            <DatosDoctores datosDoctor={datosDoctor} />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <FormNuevaCita />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <h1>Pacientes: </h1>
          </Grid>
          <Grid item xs={5} md={15} lg={12}>
            <Card>
              <Box sx={{ p: 3, pb: 40 }} dir="ltr">
                <Pacientes />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
