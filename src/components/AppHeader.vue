<template>
  <header
    class="header d-flex justify-content-between align-items-center pl-6 pr-7"
  >
    <div class="header-left d-flex align-items-center">
      <button class="hamburger" v-b-toggle.sidebar-backdrop>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <p class="logo">Arvan Challenge</p>
      <p>Welcome {{ username }}</p>
    </div>
    <b-button variant="outline-info" @click="logout">Logout</b-button>
  </header>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";
import { MUTATIONS_NAMES } from "../constants/mutation-names";

export default {
  name: "AppHeader",
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    logout() {
      this.$store.commit(MUTATIONS_NAMES.LOGOUT);
      this.$router.replace({ name: ROUTE_NAMES.LOGIN });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.header {
  color: $white;
  background-color: $gray-900;
  width: 100%;
  height: 100%;
  grid-area: header;

  .header-left {
    gap: 1.25rem;
    .logo {
      font-size: 1.375rem;
    }
  }
}
.hamburger {
  display: none;
  &:focus {
    outline: none;
  }
  @include media-breakpoint-down(lg) {
    display: block;
    background-color: transparent;
    border: none;
    div {
      position: relative;

      z-index: 1;

      span {
        display: block;
        width: 2rem;
        height: 0.25rem;
        margin-bottom: 0.25rem;
        position: relative;

        background: #cdcdcd;
        border-radius: 4px;

        z-index: 1;
      }
    }
  }
}
</style>
