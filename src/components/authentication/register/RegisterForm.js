import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
      matricula: '',
      nombres: '',
      apellidos: '',
      peso: '',
      altura: '',
      imc: 0,
      rol: '',
      carrera: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      formik.values.imc = (
        parseFloat(formik.values.peso) /
        parseFloat(formik.values.altura) ** 2
      ).toFixed(3);
      console.log(formik.values);
      parseInt(formik.values.matricula, 10);
      parseFloat(formik.values.peso);
      parseFloat(formik.values.altura);
      parseFloat(formik.values.imc);
      const requestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formik.values)
      };
      fetch('http://localhost:8080/api', requestInit)
        .then((res) => res.text())
        .then((res) => console.log(res));
      navigate('/login', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            label="Matricula"
            {...getFieldProps('matricula')}
          />
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
            value={(parseFloat(formik.values.peso) / parseFloat(formik.values.altura) ** 2).toFixed(
              3
            )}
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
            Registrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
