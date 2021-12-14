import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MHidden } from '../components/@material-extend';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Home() {
  const navigate = useNavigate();
  return (
    <RootStyle title="| Life Control |">
      <AuthLayout>
        No tienes una cuenta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Registrate
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hola, bienvenid@ de vuelta
          </Typography>
          <img src="/static/LIFEbueno.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Bienvenid@ a life control
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Selecciona el modo en el que iniciaras
            </Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Registro de participantes
            </Typography>
          </Divider>

          {/* <LoginForm /> */}
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              navigate('/register', { replace: true });
            }}
          >
            Registrar modo participante
          </LoadingButton>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Inicio participantes
            </Typography>
          </Divider>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="outlined"
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            Ingresar como participante
          </LoadingButton>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Proveedores
            </Typography>
          </Divider>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={() => {
              navigate('/loginpro', { replace: true });
            }}
          >
            Ingresar como Proveedor
          </LoadingButton>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Doctores
            </Typography>
          </Divider>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="info"
            onClick={() => {
              navigate('/logindoc', { replace: true });
            }}
          >
            Ingresar como Doctor
          </LoadingButton>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Administrativos
            </Typography>
          </Divider>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="warning"
            onClick={() => {
              navigate('/loginadmi', { replace: true });
            }}
          >
            Ingresar como Admin
          </LoadingButton>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
