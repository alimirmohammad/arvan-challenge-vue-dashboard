<template>
  <div class="page">
    <header
      class="header d-flex justify-content-between align-items-center pl-6 pr-7"
    >
      <div class="header-left d-flex align-items-center">
        <p class="logo">Arvan Challenge</p>
        <p class="welcome">Welcome {{ username }}</p>
      </div>
      <b-button variant="outline-info" @click="logout">Logout</b-button>
    </header>
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
    <main class="main">
      <app-toast
        variant="success"
        :title="`${message !== 'deleted' ? 'Well done! ' : ''}`"
        :dismissible="false"
        :show="toastVisible"
        :body="`Article ${message} successfully`"
        :onDismiss="hideToast"
        :top="20"
      />
      <router-view @success="onSuccess"></router-view>
    </main>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";
import { MUTATIONS_NAMES } from "../constants/mutation-names";
import AppToast from "../components/AppToast.vue";
export default {
  components: { AppToast },
  data() {
    return {
      ALL_ARTICLES_ROUTE_NAME: ROUTE_NAMES.ARTICLES_FIRST_PAGE,
      CREATE_ARTICLE_ROUTE_NAME: ROUTE_NAMES.CREATE_ARTICLE,
      toastVisible: false,
      message: "",
    };
  },
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
    showToast() {
      this.toastVisible = true;
    },
    hideToast() {
      this.toastVisible = false;
    },
    onSuccess(value) {
      this.message = value;
      this.showToast();
    },
  },
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

  .header {
    color: $white;
    background-color: $gray-900;
    width: 100%;
    height: 100%;
    grid-area: header;

    .header-left {
      gap: 20px;
      .logo {
        font-size: 22px;
      }
    }
  }

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

  .main {
    grid-area: main;
    padding: 24px 30px 73px;
    position: relative;
  }
}
</style>
