import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES } from "../constants/routes";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Articles from "../views/Articles.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.LOGIN_ROUTE,
    component: Login,
    meta: { onlyUnauthenticated: true },
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    component: Register,
    meta: { onlyUnauthenticated: true },
  },
  {
    path: ROUTES.ARTICLES_ROUTE,
    component: Articles,
    meta: { onlyAuthenticated: true },
  },
  {
    path: ROUTES.CATCH_ALL_ROUTE,
    redirect() {
      const isAuthenticated = store.getters.isAuthenticated;
      return isAuthenticated ? ROUTES.ARTICLES_ROUTE : ROUTES.LOGIN_ROUTE;
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.onlyUnauthenticated) {
    if (isAuthenticated) next(ROUTES.ARTICLES_ROUTE);
    else next();
  } else if (to.meta.onlyAuthenticated) {
    if (isAuthenticated) next();
    else next(ROUTES.LOGIN_ROUTE);
  } else {
    next();
  }
});

export default router;
