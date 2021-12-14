import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, AppBar, Toolbar, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar, datosAdmin, countCorreo }) {
  const navigate = useNavigate();
  return (
    <RootStyle>
      <ToolbarStyle>
        <Grid container spacing={1}>
          <Grid item xs={1} md={0.1} lg={12}>
            <Card>
              <Box sx={{ p: 1, pb: 1, backgroundColor: '#d2e7ed' }} dir="ltr">
                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Life control
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Admin / {datosAdmin.nombre}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Correos: {countCorreo.length}
                  </Typography>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </ToolbarStyle>
    </RootStyle>
  );
}
