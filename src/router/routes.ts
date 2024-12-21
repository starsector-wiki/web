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
      { name: 'special_items', path: 'special_items', component: () => import('pages/SpecialItemsPage.vue'), },
      { name: 'special_item', path: 'special_item/:id', component: () => import('pages/SpecialItemPage.vue'), },
      { name: 'commodites', path: 'commodites', component: () => import('pages/CommoditesPage.vue'), },
      { name: 'commodity', path: 'commodity/:id', component: () => import('pages/CommodityPage.vue'), },
      { name: 'industries', path: 'industries', component: () => import('pages/IndustriesPage.vue'), },
      { name: 'industry', path: 'industry/:id', component: () => import('pages/IndustryPage.vue'), },
      { name: 'planet_types', path: 'planet_types', component: () => import('pages/PlanetTypesPage.vue'), },
      { name: 'planet_type', path: 'planet_type/:id', component: () => import('pages/PlanetTypePage.vue'), },
      { name: 'market_conditions', path: 'market_conditions', component: () => import('pages/MarketConditionsPage.vue'), },
      { name: 'market_condition', path: 'market_condition/:id', component: () => import('pages/MarketConditionPage.vue'), },
      { name: 'sub_markets', path: 'sub_markets', component: () => import('pages/SubMarketsPage.vue'), },
      { name: 'sub_market', path: 'sub_market/:id', component: () => import('pages/SubMarketPage.vue'), },
      { name: 'factions', path: 'factions', component: () => import('pages/FactionsPage.vue'), },
      { name: 'faction', path: 'faction/:id', component: () => import('pages/FactionPage.vue'), },
      { name: 'star_systems', path: 'star_systems', component: () => import('pages/StarSystemsPage.vue'), },
      { name: 'star_system', path: 'star_system/:id', component: () => import('pages/StarSystemPage.vue'), },
      { name: 'planets', path: 'planets', component: () => import('pages/PlanetsPage.vue'), },
      { name: 'planet', path: 'planet/:id', component: () => import('pages/PlanetPage.vue'), },
      { name: 'persons', path: 'persons', component: () => import('pages/PersonsPage.vue'), },
      { name: 'person', path: 'person/:id', component: () => import('pages/PersonPage.vue'), },
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
