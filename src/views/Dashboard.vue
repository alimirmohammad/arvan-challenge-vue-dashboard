<template>
  <app-layout>
    <dashboard-main></dashboard-main>
  </app-layout>
</template>

<script>
import { getCurrentUser } from "../api/auth-api";
import DashboardMain from "../components/Dashboard/DashboardMain.vue";
import AppLayout from "../components/UI/AppLayout.vue";

export default {
  components: { DashboardMain, AppLayout },
  methods: {
    async getUser() {
      const currentUser = await getCurrentUser();
      console.log({ currentUser });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
