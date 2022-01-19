<template>
  <div class="page">
    <app-toast
      variant="danger"
      :title="`${this.isRegister ? 'Register' : 'Login'} Failed!`"
      :dismissible="true"
      :show="toastVisible"
      :body="errorMessage"
      :onDismiss="hideToast"
      :top="1.875"
    />
    <div class="form p-6">
      <validation-observer v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <h1 class="form-title mt-3 mb-7">
            {{ isRegister ? "Register" : "LOGIN" }}
          </h1>
          <form-text-field
            name="username"
            rules="required"
            label="User"
            v-model="username"
            type="text"
            class="mb-4"
            v-if="isRegister"
          ></form-text-field>
          <form-text-field
            name="email"
            rules="required|email"
            label="Email"
            v-model="email"
            type="email"
            class="mb-4"
          ></form-text-field>
          <form-text-field
            name="password"
            rules="required"
            label="Password"
            v-model="password"
            type="password"
            class="mb-7"
          ></form-text-field>
          <loading-button
            class="mt-5"
            block
            variant="primary"
            type="submit"
            :loading="loading"
          >
            {{ isRegister ? "Register" : "Login" }}
          </loading-button>
        </b-form>
      </validation-observer>
      <p class="mt-3 mb-0">
        <span>{{
          isRegister ? "Already Registered? " : "Don’t have account? "
        }}</span>
        <router-link class="link" :to="isRegister ? '/login' : '/register'">{{
          isRegister ? "Login" : "Register Now"
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import FormTextField from "../components/UI/FormTextField.vue";
import { ValidationObserver } from "vee-validate";
import { authenticate } from "../api/auth-api";
import extractErrorMessage from "../utils/extractErrorMessage";
import AppToast from "../components/UI/AppToast.vue";
import { MUTATIONS_NAMES } from "../constants/mutation-names";
import { ROUTE_NAMES } from "../constants/routes";
import LoadingButton from "../components/UI/LoadingButton.vue";

export default {
  name: "AuthForm",
  components: { FormTextField, ValidationObserver, AppToast, LoadingButton },
  props: ["isRegister"],
  data() {
    return {
      email: "",
      password: "",
      username: "",
      toastVisible: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        const authData = await authenticate({
          isRegister: this.isRegister,
          email: this.email,
          password: this.password,
          username: this.username,
        });
        this.$store.commit(MUTATIONS_NAMES.AUTHENTICATE, authData);
        this.$router.replace({ name: ROUTE_NAMES.ARTICLES_FIRST_PAGE });
      } catch (error) {
        const message = extractErrorMessage(error);
        this.errorMessage = message;
        this.showToast();
        this.loading = false;
      }
    },
    showToast() {
      this.toastVisible = true;
    },
    hideToast() {
      this.toastVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.form {
  width: 90%;
  max-width: 450px;
  background-color: #eceeef;
  text-align: left;
  @include media-breakpoint-down(sm) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.3rem;
  }

  @include media-breakpoint-down(xs) {
    font-size: 1.2rem;
  }
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @include media-breakpoint-down(sm) {
    background-color: #eceeef;
  }
}
.form-title {
  font-size: 3rem;
  font-weight: normal;
  line-height: 1.19;
  color: $gray-title;
  text-align: center;
}
.link {
  color: inherit;
  font-weight: bold;
}
</style>
