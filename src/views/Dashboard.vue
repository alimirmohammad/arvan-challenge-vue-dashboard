<template>
  <div class="page">
    <app-header></app-header>
    <app-aside></app-aside>
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
</style>
