import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import hoursToMinutes from 'date-fns/esm/fp/hoursToMinutes/index';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SidebarConfigAdmin = [
  {
    title: 'usuarios',
    path: '/admin/view',
    icon: getIcon(peopleFill)
  },
  {
    title: 'proveedores',
    path: '/admin/controlpro',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'doctores',
    path: '/admin/controldoc',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'emails',
    path: '/admin/email',
    icon: getIcon(emailFill)
  }
];

export default SidebarConfigAdmin;
