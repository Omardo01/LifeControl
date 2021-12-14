import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import Cookies from 'js-cookie';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function FormSubirPlatillo() {
  const [inputValueNombre, setinputValueNombre] = useState('');
  const [inputValueCalorias, setinputValueCalorias] = useState('');
  const [inputValuePrecio, setInputValuePrecio] = useState('');
  const [inputValueUrl, setInputValueUrl] = useState('');

  const datos = {
    id_producto: 0,
    nombre: inputValueNombre,
    calorias: inputValueCalorias,
    precio: inputValuePrecio,
    link: inputValueUrl,
    matricula_pro: Cookies.get('matricula')
  };

  const handleInputChangeNombre = (e) => {
    setinputValueNombre(e.target.value);
  };
  const handleInputChangeCalorias = (e) => {
    setinputValueCalorias(e.target.value);
  };
  const handleInputChangePrecio = (e) => {
    setInputValuePrecio(e.target.value);
  };
  const handleInputChangeUrl = (e) => {
    setInputValueUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    };
    fetch('http://localhost:8080/api/productos', requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
    window.location.reload();
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password es requerida')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log('boton');
    }
  });

  const { errors, touched, values, isSubmitting, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="label-nombre"
            fullWidth
            label="Nombre del Producto"
            value={inputValueNombre}
            onChange={handleInputChangeNombre}
          />
          <TextField
            fullWidth
            label="Calorias"
            value={inputValueCalorias}
            onChange={handleInputChangeCalorias}
          />
          <TextField
            fullWidth
            label="Precio"
            value={inputValuePrecio}
            onChange={handleInputChangePrecio}
          />
          <TextField
            fullWidth
            label="Link de Imagen"
            value={inputValueUrl}
            onChange={handleInputChangeUrl}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Agregar
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
