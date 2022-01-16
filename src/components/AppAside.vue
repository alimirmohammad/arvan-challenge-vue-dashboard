<template>
  <aside class="aside">
    <nav>
      <p class="nav-title pl-6 py-3">Post</p>
      <router-link class="link" :to="{ name: ALL_ARTICLES_ROUTE_NAME }"
        >All Articles</router-link
      >
      <router-link class="link" :to="{ name: CREATE_ARTICLE_ROUTE_NAME }"
        >New Article</router-link
      >
    </nav>
  </aside>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";

export default {
  name: "AppAside",
  data() {
    return {
      ALL_ARTICLES_ROUTE_NAME: ROUTE_NAMES.ARTICLES_FIRST_PAGE,
      CREATE_ARTICLE_ROUTE_NAME: ROUTE_NAMES.CREATE_ARTICLE,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.aside {
  color: $white;
  background-color: $blue;
  grid-area: aside;

  .link {
    color: inherit;
    display: block;
    padding: 11px 34px;
    font-size: 18px;

    &.router-link-exact-active {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }

  .nav-title {
    font-size: 22px;
  }
}
</style>
