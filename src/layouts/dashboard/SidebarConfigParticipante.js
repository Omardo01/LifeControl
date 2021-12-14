import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import hoursToMinutes from 'date-fns/esm/fp/hoursToMinutes/index';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const SidebarConfigParticipante = [
  {
    title: 'principal',
    path: '/participante/view',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'datos',
    path: '/participante/datos',
    icon: getIcon(peopleFill)
  },
  {
    title: 'historial',
    path: '/participante/historial',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'citas',
    path: '/participante/citas',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'control',
    path: '/participante/control',
    icon: getIcon(lockFill)
  },
  {
    title: 'correo',
    path: '/participante/correo',
    icon: getIcon(fileTextFill)
  }
];

export default SidebarConfigParticipante;
