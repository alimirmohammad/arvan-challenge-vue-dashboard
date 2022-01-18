<template>
  <div class="page">
    <app-header></app-header>
    <app-aside class="app-side"></app-aside>
    <b-sidebar id="sidebar-backdrop" backdrop shadow no-header>
      <app-aside class="sidebar"></app-aside>
    </b-sidebar>
    <dashboard-main></dashboard-main>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import AppAside from "../components/AppAside.vue";
import DashboardMain from "../components/DashboardMain.vue";

export default {
  components: { DashboardMain, AppHeader, AppAside },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.page {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "header header"
    "aside main";
}
@include media-breakpoint-down(lg) {
  .app-side {
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
