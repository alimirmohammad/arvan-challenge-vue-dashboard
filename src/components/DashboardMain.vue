<template>
  <main class="main">
    <app-toast
      :variant="wasSuccessful ? 'success' : 'danger'"
      :title="toastTitle"
      :dismissible="false"
      :show="toastVisible"
      :body="toastBody"
      :onDismiss="hideToast"
      :top="20"
    />
    <router-view @success="onSuccess" @fail="onFail"></router-view>
  </main>
</template>

<script>
import AppToast from "../components/AppToast.vue";

export default {
  name: "DashboardMain",
  components: { AppToast },
  data() {
    return {
      toastVisible: false,
      message: "",
      wasSuccessful: false,
    };
  },
  computed: {
    toastTitle() {
      if (!this.wasSuccessful) return "";
      return `${this.message !== "deleted" ? "Well done! " : ""}`;
    },
    toastBody() {
      if (!this.wasSuccessful) return this.message;
      return `Article ${this.message} successfully`;
    },
  },
  methods: {
    showToast() {
      this.toastVisible = true;
    },
    hideToast() {
      this.toastVisible = false;
    },
    onSuccess(message) {
      this.wasSuccessful = true;
      this.setToastMessage(message);
    },
    onFail(message) {
      this.wasSuccessful = false;
      this.setToastMessage(message);
    },
    setToastMessage(message) {
      this.message = message;
      this.showToast();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  grid-area: main;
  padding: 1.5rem 1.875rem 4.5rem;
  position: relative;
}
</style>
