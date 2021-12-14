import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Home from './pages/Home';
import LoginProveedor from './pages/LoginProveedor';
import LoginDoctor from './pages/LoginDoctor';
import Doctor from './pages/Doctor';
import LoginAdmi from './pages/LoginAdmi';
import DashboardLayoutParticipante from './layouts/dashboard/index_p';
import Participante from './pages/Participante';
import ControlDiario from './components/participantes/ControlDiario';
import Citas from './components/participantes/Citas';
import Historial from './components/participantes/Historial';
import Datos from './components/participantes/Datos';
import Correo from './components/participantes/Correo';
import DashboardLayoutAdmin from './layouts/dashboard/index_admin';
import ListaParticipantes from './components/admins/ListaParticipantes';
import ControlProveedores from './components/admins/ControlProveedores';
import ControlDoctores from './components/admins/ControlDoctores';
import Correos from './components/admins/Correos';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/participante',
      element: <DashboardLayoutParticipante />,
      children: [
        { element: <Navigate to="/participante/view" replace /> },
        { path: 'view', element: <Participante /> },
        { path: 'control', element: <ControlDiario /> },
        { path: 'citas', element: <Citas /> },
        { path: 'historial', element: <Historial /> },
        { path: 'datos', element: <Datos /> },
        { path: 'correo', element: <Correo /> }
      ]
    },
    {
      path: '/admin',
      element: <DashboardLayoutAdmin />,
      children: [
        { element: <Navigate to="/admin/view" replace /> },
        { path: 'view', element: <ListaParticipantes /> },
        { path: 'controlpro', element: <ControlProveedores /> },
        { path: 'controldoc', element: <ControlDoctores /> },
        { path: 'email', element: <Correos /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'loginpro', element: <LoginProveedor /> },
        { path: 'logindoc', element: <LoginDoctor /> },
        { path: 'loginadmi', element: <LoginAdmi /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/prove', element: <Products /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/proveedor', element: <Products /> },
    { path: '/doctor', element: <Doctor /> }
  ]);
}
