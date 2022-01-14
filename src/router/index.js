import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES, ROUTE_NAMES } from "../constants/routes";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Articles from "../views/Articles.vue";
import Dashboard from "../views/Dashboard.vue";
import CreateArticle from "../views/CreateArticle.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.LOGIN_ROUTE,
    name: ROUTE_NAMES.LOGIN,
    component: Login,
    meta: { onlyUnauthenticated: true },
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    name: ROUTE_NAMES.REGISTER,
    component: Register,
    meta: { onlyUnauthenticated: true },
  },
  {
    path: ROUTES.DASHBOARD_ROUTE,
    component: Dashboard,
    meta: { onlyAuthenticated: true },
    children: [
      {
        path: ROUTES.ARTICLES_FIRST_PAGE_PATH,
        name: ROUTE_NAMES.ARTICLES_FIRST_PAGE,
        component: Articles,
      },
      {
        path: ROUTES.ARTICLES_PAGE_PATH,
        name: ROUTE_NAMES.ARTICLES_PAGE,
        component: Articles,
      },
      {
        path: ROUTES.CREATE_ARTICLE_PATH,
        name: ROUTE_NAMES.CREATE_ARTICLE,
        component: CreateArticle,
      },
      {
        path: ROUTES.EDIT_ARTICLE_PATH,
        name: ROUTE_NAMES.EDIT_ARTICLE,
        component: CreateArticle,
      },
    ],
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
  if (to.matched.some((record) => record.meta.onlyUnauthenticated)) {
    if (isAuthenticated) next(ROUTES.DASHBOARD_ROUTE);
    else next();
  } else if (to.matched.some((record) => record.meta.onlyAuthenticated)) {
    if (isAuthenticated) next();
    else next(ROUTES.LOGIN_ROUTE);
  } else {
    next();
  }
});

export default router;
