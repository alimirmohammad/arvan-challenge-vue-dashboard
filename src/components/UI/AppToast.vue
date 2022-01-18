<template>
  <b-alert
    :show="dismissCountDown"
    :dismissible="dismissible"
    :variant="variant"
    @dismissed="handleDismiss"
    @dismiss-count-down="countDownChanged"
    class="snackbar mb-0"
    :style="{ top: `${top}px` }"
  >
    <p class="mb-0">
      <span class="snackbar-title">{{ title }}</span> <span>{{ body }}</span>
    </p>
  </b-alert>
</template>

<script>
export default {
  name: "AppToast",
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    hideAlert() {
      this.dismissCountDown = 0;
    },
    handleDismiss() {
      this.hideAlert();
      this.onDismiss();
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.showAlert();
      } else {
        this.hideAlert();
      }
    },
  },
  props: [
    "show",
    "dismissible",
    "variant",
    "title",
    "body",
    "onDismiss",
    "top",
  ],
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: absolute !important;
  right: 30px;
}
.snackbar-title {
  font-weight: bold;
}
</style>
