import { createRouter, createMemoryHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import CartView from "../views/CartView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView
  },
    {
    path: "/shop",
    name: "ShopView",
    component: ShopView
  },
  {
    path: "/product/:id",
    name: "ProductView",
    component: ProductView,
    props: true
  },
  {
    path: "/cart",
    name: "CartView",
    component: CartView
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;