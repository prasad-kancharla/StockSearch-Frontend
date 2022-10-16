import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/stocks",
    name: "stocks",
    component: () => import("./components/StocksList"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
