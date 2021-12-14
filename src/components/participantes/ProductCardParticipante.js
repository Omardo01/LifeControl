import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// material
import { Box, Card, Link, Typography, Stack, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
//
import Label from '../Label';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCardParticipante.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCardParticipante({ producto }) {
  const [inputValueLugar, setinputValueLugar] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(Date.now());
  const handleInputChangeLugar = (e) => {
    setinputValueLugar(e.target.value);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
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
        <ProductImgStyle alt={producto.nombre} src={producto.link} />
      </Box>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {producto.nombre}
          </Typography>
        </Link>
        <Typography variant="subtitle2" noWrap>
          Proveedor: {producto.nombre_proveedor}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption"> ${producto.precio} </Typography>
          <Typography variant="caption"> Calorias: {producto.calorias} </Typography>
          <Stack direction="row" alignItems="end" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClickOpen} size="small">
              Comprar
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Comprar platillo</DialogTitle>
              <DialogContent>
                <Stack spacing={5}>
                  <DialogContentText>Especifica el lugar de entrega</DialogContentText>
                  <TextField
                    fullWidth
                    label="Lugar"
                    value={inputValueLugar}
                    onChange={handleInputChangeLugar}
                  />
                  <DialogContentText>Especifica la fecha y hora de entrega</DialogContentText>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={5}>
                      <DateTimePicker
                        label="Fecha y Hora"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose}>Comprar</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
