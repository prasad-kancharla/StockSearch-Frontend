import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/stocks",
    name: "stocks",
    component: () => import("./components/StocksList"),
  },
  // {
  //   path: "/stocks/:id",
  //   name: "stock-details",
  //   component: () => import("./components/Stock"),
  // },
  // {
  //   path: "/add",
  //   name: "add",
  //   component: () => import("./components/AddStock"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
