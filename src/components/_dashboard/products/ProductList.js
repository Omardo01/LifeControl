import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ productos }) {
  return (
    <Grid container spacing={3}>
      {productos.map((producto) => (
        <Grid key={producto.id_producto} item xs={12} sm={6} md={3}>
          <ShopProductCard producto={producto} />
        </Grid>
      ))}
    </Grid>
  );
}
