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
      { name: 'weapons', path: 'weapons', component: () => import('pages/WeaponsPage.vue'), },
      { name: 'weapon', path: 'weapons/:id', component: () => import('pages/WeaponPage.vue'), },
      { name: 'specialItems', path: 'specialItems', component: () => import('pages/SpecialItemsPage.vue'), },
      { name: 'commodites', path: 'commodites', component: () => import('pages/CommoditesPage.vue'), },
      { name: 'industries', path: 'industries', component: () => import('pages/IndustriesPage.vue'), },
      { name: 'planetTypes', path: 'planetTypes', component: () => import('pages/PlanetTypesPage.vue'), },
      { name: 'marketConditions', path: 'marketConditions', component: () => import('pages/MarketConditionsPage.vue'), },
      { name: 'subMarkets', path: 'subMarkets', component: () => import('pages/SubMarketsPage.vue'), },
      { name: 'factions', path: 'factions', component: () => import('pages/FactionsPage.vue'), },
      { name: 'starSystems', path: 'starSystems', component: () => import('pages/StarSystemsPage.vue'), },
      { name: 'planets', path: 'planets', component: () => import('pages/PlanetsPage.vue'), },
      { name: 'persons', path: 'persons', component: () => import('pages/PersonsPage.vue'), },
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
