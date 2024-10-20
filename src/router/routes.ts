import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'ships', path: 'ships', component: () => import('pages/ShipsPage.vue'), },
      { name: 'ship', path: 'ships/:id', component: () => import('pages/ShipPage.vue'), },
      { name: 'ship_systems', path: 'ship_systems', component: () => import('pages/ShipSystemsPage.vue'), },
      { name: 'ship_system', path: 'ship_systems/:id', component: () => import('pages/ShipSystemPage.vue'), },
      { name: 'ship_mods', path: 'ship_mods', component: () => import('pages/ShipModsPage.vue'), },
      { name: 'ship_mod', path: 'ship_mods/:id', component: () => import('pages/ShipModPage.vue'), },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
