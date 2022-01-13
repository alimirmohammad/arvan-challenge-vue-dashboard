<template>
  <div class="page">
    <app-toast
      variant="danger"
      :title="`${this.isRegister ? 'Register' : 'Login'} Failed!`"
      :dismissible="true"
      :show="toastVisible"
      :body="errorMessage"
      :onDismiss="hideToast"
      :top="30"
    />
    <div class="form p-6">
      <validation-observer v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <h1 class="form-title mt-3 mb-7">
            {{ isRegister ? "Register" : "LOGIN" }}
          </h1>
          <form-text-field
            name="user"
            rules="required"
            label="User"
            v-model="user"
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
          <b-button block variant="primary" type="submit">{{
            isRegister ? "Register" : "Login"
          }}</b-button>
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
import FormTextField from "./FormTextField.vue";
import { ValidationObserver } from "vee-validate";
import client from "../utils/client";
import extractErrorMessage from "../utils/extractErrorMessage";
import AppToast from "./AppToast.vue";

export default {
  components: { FormTextField, ValidationObserver, AppToast },
  props: ["isRegister"],
  data() {
    return {
      email: "",
      password: "",
      user: "",
      toastVisible: false,
      errorMessage: "",
    };
  },
  methods: {
    async onSubmit() {
      const url = this.isRegister ? "/users" : "/users/login";
      const payload = this.isRegister
        ? {
            user: {
              email: this.email,
              password: this.password,
              username: this.user,
            },
          }
        : { user: { email: this.email, password: this.password } };
      try {
        const data = await client(url, { method: "POST", data: payload });
        console.log("data", data);
      } catch (error) {
        console.log("error", error);
        const message = extractErrorMessage(error);
        this.errorMessage = message;
        this.showToast();
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
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.form-title {
  font-size: 47px;
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
