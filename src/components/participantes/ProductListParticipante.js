import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCardParticipante from './ProductCardParticipante';

// ----------------------------------------------------------------------

ProductListParticipante.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductListParticipante({ productos }) {
  return (
    <Grid container spacing={3}>
      {productos.map((producto) => (
        <Grid key={producto.id_product} item xs={12} sm={6} md={3}>
          <ShopProductCardParticipante producto={producto} />
        </Grid>
      ))}
    </Grid>
  );
}
