<template>
  <aside class="aside">
    <nav>
      <p class="nav-title pl-6 py-3">Post</p>
      <router-link
        class="link"
        :class="{ 'my-active-class': $route.name === ARTICLES_PAGE_ROUTE_NAME }"
        :to="{ name: ARTICLES_FIRST_PAGE_ROUTE_NAME }"
      >
        All Articles
      </router-link>
      <router-link
        class="link"
        :class="{ 'my-active-class': $route.name === EDIT_ARTICLE_ROUTE_NAME }"
        :to="{ name: CREATE_ARTICLE_ROUTE_NAME }"
      >
        New Article
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { ROUTE_NAMES } from "../../constants/routes";

export default {
  name: "AppAside",
  data() {
    return {
      ARTICLES_FIRST_PAGE_ROUTE_NAME: ROUTE_NAMES.ARTICLES_FIRST_PAGE,
      ARTICLES_PAGE_ROUTE_NAME: ROUTE_NAMES.ARTICLES_PAGE,
      CREATE_ARTICLE_ROUTE_NAME: ROUTE_NAMES.CREATE_ARTICLE,
      EDIT_ARTICLE_ROUTE_NAME: ROUTE_NAMES.EDIT_ARTICLE,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
.aside {
  color: $white;
  background-color: $blue;
  grid-area: aside;

  .link {
    color: inherit;
    display: block;
    padding: 0.6875rem 2.125rem;
    font-size: 1.125rem;

    &.router-link-exact-active,
    &.my-active-class {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }

  .nav-title {
    font-size: 1.375rem;
  }
}
</style>
