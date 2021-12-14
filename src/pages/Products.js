import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import { Container, Card, Box, Typography, Grid, Avatar } from '@mui/material';
// components
import Cookies from 'js-cookie';
import Page from '../components/Page';
import ProductList from '../components/_dashboard/products/ProductList';
//
import { AppWebsiteVisits } from '../components/_dashboard/app';
import DatosProveedor from '../components/proveedores/DatosProveedor';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [datosProveedor, setDatosProveedor] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProveedor = () => {
      fetch(`http://localhost:8080/api/provee/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosProveedor(res[0]));
    };
    const getProductos = () => {
      fetch(`http://localhost:8080/api/productos/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setProductos(res));
    };
    getProveedor();
    getProductos();
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
    <Page title="Proveedores | Life Control">
      <Container maxWidth="xl">
        <Grid container spacing={1} bg="">
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
                  /Proveedor/
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <br />
        <Typography variant="h4" sx={{ mb: 5 }}>
          {datosProveedor.nombre_proveedor}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={4}>
            <DatosProveedor datosProveedor={datosProveedor} />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <AppWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <h1>Sus productos: </h1>
          </Grid>

          <Grid item xs={12} md={15} lg={12}>
            <ProductList productos={productos} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
