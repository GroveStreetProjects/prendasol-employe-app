/* import { Ionicons } from '@expo/vector-icons'; */

interface MenuRoute {
  title: string;
  /* icon: keyof typeof Ionicons.glyphMap; */
  name: string;
}

export const rutaPrincipal: MenuRoute[] = [
  {
    title: 'Inicio',
    name: 'inicio/index',
  },
];

export const rutasEmpenio: MenuRoute[] = [
  {
    title: 'Nuevo Empeño',
    name: 'registrar-empenio/index',
  },
];

export const rutasCliente: MenuRoute[] = [
  /* {
    title: 'Ruta de Cliente 1',
    name: 'cliente/index',
  }, */
];

export const rutasReporte: MenuRoute[] = [
  /* {
    title: 'Ruta de Empeño 1',
    icon: 'refresh-outline',
    name: 'reporte/index',
  }, */
];

export const allRoutes: MenuRoute[] = [
  ...rutaPrincipal,
  ...rutasCliente,
  ...rutasEmpenio,
  ...rutasReporte,
];
