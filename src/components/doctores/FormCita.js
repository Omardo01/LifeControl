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
import Cookies from 'js-cookie';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// ----------------------------------------------------------------------

export default function FormCita() {
  const [inputValueMatricula, setinputValueMatricula] = useState('');
  const [inputValueLugar, setinputValueLugar] = useState('');
  const [value, setValue] = useState(Date.now());
  const datos = {
    id_cita: 0,
    matricula_usuario: inputValueMatricula,
    lugar: inputValueLugar,
    fecha: value,
    matricula_doctor: Cookies.get('matricula')
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleInputChangeMatricula = (e) => {
    setinputValueMatricula(e.target.value);
  };
  const handleInputChangeLugar = (e) => {
    setinputValueLugar(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    };
    fetch('http://localhost:8080/api/citas', requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));
    console.log(value);
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
            label="Matricula del paciente"
            value={inputValueMatricula}
            onChange={handleInputChangeMatricula}
          />
          <TextField
            fullWidth
            label="Lugar"
            value={inputValueLugar}
            onChange={handleInputChangeLugar}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label="Fecha y Hora"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={() => {
              console.log(inputValueMatricula);
              console.log(inputValueLugar);
              console.log(value);
            }}
          >
            Citar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
