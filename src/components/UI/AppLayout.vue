<template>
  <div class="page">
    <app-header></app-header>
    <app-aside class="app-aside"></app-aside>
    <b-sidebar id="sidebar-backdrop" backdrop shadow no-header>
      <app-aside class="sidebar"></app-aside>
    </b-sidebar>
    <slot></slot>
  </div>
</template>

<script>
import AppHeader from "../Dashboard/AppHeader.vue";
import AppAside from "../Dashboard/AppAside.vue";

export default {
  name: "AppLayout",
  components: { AppHeader, AppAside },
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
.page {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 15.625rem 1fr;
  grid-template-rows: 3.75rem 1fr;
  grid-template-areas:
    "header header"
    "aside main";
}
@include media-breakpoint-down(lg) {
  .app-aside {
    display: none;
  }

  .page {
    grid-template-areas:
      "header header"
      "main main";
  }
}
.sidebar {
  height: 100%;
}
</style>
