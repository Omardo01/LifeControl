import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
//
import Label from '../../Label';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ producto }) {
  const handleDelete = (id) => {
    const requestInit = {
      method: 'DELETE'
    };
    fetch(`http://localhost:8080/api/productos/${id}`, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
  };
  const navigate = useNavigate();
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color="info"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          En venta
        </Label>
        <ProductImgStyle alt={producto.nombre} src={`${producto.link}`} />
      </Box>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {producto.nombre}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1"> Precio: ${producto.precio} </Typography>
          <Typography variant="subtitle2"> Calorias: {producto.calorias} </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <LoadingButton
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => {
                handleDelete(producto.id_producto);
                window.location.reload();
              }}
            >
              Eliminar
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
