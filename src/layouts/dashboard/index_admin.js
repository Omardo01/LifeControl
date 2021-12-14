import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
//
import DashboardNavbarAdmin from './DashboardNavbarAdmin';
import DashboardSidebarAdmin from './DashboardSidebarAdmin';

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

export default function DashboardLayoutAdmin() {
  const [datosAdmin, setDatosAdmin] = useState({});
  const [countCorreo, setCountCorreo] = useState([]);

  useEffect(() => {
    const getPersona = () => {
      fetch(`http://localhost:8080/api/admin/${Cookies.get('matricula')}`)
        .then((res) => res.json())
        .then((res) => setDatosAdmin(res[0]));
    };
    const getCorreos = () => {
      fetch(`http://localhost:8080/api/correos/todo`)
        .then((res) => res.json())
        .then((res) => setCountCorreo(res));
    };
    getCorreos();
    getPersona();
  }, []);
  const [open, setOpen] = useState(false);

  console.log(datosAdmin);

  return (
    <RootStyle>
      <DashboardNavbarAdmin
        onOpenSidebar={() => setOpen(true)}
        datosAdmin={datosAdmin}
        countCorreo={countCorreo}
      />
      <DashboardSidebarAdmin
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        datosAdmin={datosAdmin}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
