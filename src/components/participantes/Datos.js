import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Card,
  CardHeader,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function Datos() {
  const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
  }));

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [datosPersona, setDatosPersona] = useState({});

  useEffect(() => {
    const getPersona = async () => {
      await fetch(`http://localhost:8080/api/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosPersona(res[0]));
    };
    getPersona();
  }, []);
  const RegisterSchema = Yup.object().shape({
    matricula: Yup.number().required('Matricula es requerida!'),
    nombres: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Nombres requeridos!'),
    apellidos: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Apellidos Requeridos!'),
    peso: Yup.number().required('Peso es requerida!'),
    altura: Yup.number().required('Peso es requerida!'),
    rol: Yup.string().required('Rol es requerido!'),
    carrera: Yup.string().required('Carrera es requerida!'),
    password: Yup.string().required('Password es requerida!')
  });

  const formik = useFormik({
    initialValues: {
      carrera: datosPersona.carrera
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      formik.values.imc =
        parseFloat(formik.values.peso) / (parseFloat(formik.values.altura) ** 2).toFixed(3);
      parseInt(formik.values.matricula, 10);
      parseFloat(formik.values.peso);
      parseFloat(formik.values.altura);
      parseFloat(formik.values.imc);
      console.log(formik.values);
      const requestInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formik.values)
      };
      fetch(`http://localhost:8080/api/${formik.values.matricula}`, requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));
      navigate('/participante/view', { replace: true });
      window.location.reload();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card>
      <CardHeader title="Actualizar tus datos" subheader="Puedes actualizar tus datos" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <AccountStyle key={datosPersona.matricula}>
          <Avatar src="https://www.pngarts.com/files/11/Avatar-PNG-Free-Download.png" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Nombre: {datosPersona.nombres}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Apellidos: {datosPersona.apellidos}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Matricula: {datosPersona.matricula}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Peso: {datosPersona.peso}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Altura: {datosPersona.altura}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              IMC: {datosPersona.imc}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Carrera: {datosPersona.carrera}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Rol: {datosPersona.rol}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Efectivo: {datosPersona.efectivo}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Calorias Recomendadas: {datosPersona.calorias_recomendadas}
            </Typography>
          </Box>
        </AccountStyle>
      </Box>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField fullWidth label="Matricula" {...getFieldProps('matricula')} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField fullWidth label="Nombres" {...getFieldProps('nombres')} />
              <TextField fullWidth label="Apellidos" {...getFieldProps('apellidos')} />
            </Stack>
            <TextField fullWidth label="Peso" {...getFieldProps('peso')} />
            <TextField fullWidth label="Altura" {...getFieldProps('altura')} />
            <TextField
              disabled
              fullWidth
              label="Imc"
              {...getFieldProps('imc')}
              value={(
                parseFloat(formik.values.peso) /
                parseFloat(formik.values.altura) ** 2
              ).toFixed(3)}
            />
            <TextField
              fullWidth
              label="Rol: Estudiante, Maestro o Administrativo"
              {...getFieldProps('rol')}
            />
            <TextField fullWidth label="Carrera" {...getFieldProps('carrera')} />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Actualizar Datos
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
