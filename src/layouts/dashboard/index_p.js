import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
//  import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebarParticipante from './DashboardSidebarParticipante';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayoutParticipante() {
  //  const cookies = new Cookies();
  const [datosPersona, setDatosPersona] = useState({});

  useEffect(() => {
    const getPersona = () => {
      fetch(`http://localhost:8080/api/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosPersona(res[0]));
    };
    getPersona();
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} datosPersona={datosPersona} />
      <DashboardSidebarParticipante
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        datosPersona={datosPersona}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
