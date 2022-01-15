export const API_ROUTES = {
  REGISTER_ROUTE: "/users",
  LOGIN_ROUTE: "/users/login",
  ARTICLES_ROUTE: "/articles",
  TAGS_ROUTE: "/tags",
  ARTICLE_BY_SLUG_ROUTE: (slug) => `/articles/${slug}`,
};
