import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// ----------------------------------------------------------------------

export default function FormNuevoDoctor() {
  const [inputValueMatricula, setinputValueMatricula] = useState('');
  const [inputValueNombre, setinputValueNombre] = useState('');
  const [inputValuePass, setinputValuePass] = useState('');

  const datos = {
    matricula: inputValueMatricula,
    nombre: inputValueNombre,
    password: inputValuePass
  };

  const handleInputChangeMatricula = (e) => {
    setinputValueMatricula(e.target.value);
  };
  const handleInputChangeNombre = (e) => {
    setinputValueNombre(e.target.value);
  };
  const handleInputChangePass = (e) => {
    setinputValuePass(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    parseInt(datos.matricula, 10);
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    };
    fetch('http://localhost:8080/api/doctores', requestInit)
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
            id="label-matricula"
            fullWidth
            label="Matricula del doctor"
            value={inputValueMatricula}
            onChange={handleInputChangeMatricula}
          />
          <TextField
            fullWidth
            label="Nombre del doctor"
            value={inputValueNombre}
            onChange={handleInputChangeNombre}
          />
          <TextField
            fullWidth
            label="Pass del doctor"
            value={inputValuePass}
            onChange={handleInputChangePass}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={() => {}}
          >
            Agregar Doctor
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
