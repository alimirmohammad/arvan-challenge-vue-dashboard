import Vue from "vue";
import VueRouter from "vue-router";
import { ROUTES, ROUTE_NAMES } from "../constants/routes";
import AuthForm from "../views/AuthForm.vue";
import ArticlesList from "../components/Dashboard/ArticlesList.vue";
import Dashboard from "../views/Dashboard.vue";
import WriteArticle from "../components/Dashboard/WriteArticle.vue";
import store from "../store/index";
import {
  clearLocalStorage,
  getTokenFromLocalStorage,
} from "../utils/local-storage";
import { getCurrentUser } from "../api/auth-api";
import { MUTATIONS_NAMES } from "../constants/mutation-names";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.LOGIN_ROUTE,
    name: ROUTE_NAMES.LOGIN,
    component: AuthForm,
    meta: { onlyUnauthenticated: true },
  },
  {
    path: ROUTES.REGISTER_ROUTE,
    name: ROUTE_NAMES.REGISTER,
    component: AuthForm,
    props: { isRegister: true },
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
        component: ArticlesList,
        props: true,
      },
      {
        path: ROUTES.ARTICLES_PAGE_PATH,
        name: ROUTE_NAMES.ARTICLES_PAGE,
        component: ArticlesList,
        props: true,
      },
      {
        path: ROUTES.CREATE_ARTICLE_PATH,
        name: ROUTE_NAMES.CREATE_ARTICLE,
        component: WriteArticle,
      },
      {
        path: ROUTES.EDIT_ARTICLE_PATH,
        name: ROUTE_NAMES.EDIT_ARTICLE,
        component: WriteArticle,
      },
    ],
  },
  {
    path: ROUTES.CATCH_ALL_ROUTE,
    redirect() {
      const isAuthenticated = store.getters.isAuthenticated;
      return isAuthenticated ? ROUTES.DASHBOARD_ROUTE : ROUTES.LOGIN_ROUTE;
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

getTokenFromLocalStorage();

router.beforeEach(async function (to, from, next) {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some((record) => record.meta.onlyUnauthenticated)) {
    if (isAuthenticated) next(ROUTES.DASHBOARD_ROUTE);
    else next();
  } else if (to.matched.some((record) => record.meta.onlyAuthenticated)) {
    if (isAuthenticated) {
      try {
        const username = await getCurrentUser();
        store.commit(MUTATIONS_NAMES.SET_USERNAME, { username });
        next();
      } catch (error) {
        clearLocalStorage();
        store.commit(MUTATIONS_NAMES.LOGOUT);
        next(ROUTES.LOGIN_ROUTE);
      }
    } else next(ROUTES.LOGIN_ROUTE);
  } else {
    next();
  }
});

export default router;
