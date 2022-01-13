<template>
  <div class="page">
    <div class="form p-6">
      <validation-observer ref="form">
        <b-form @submit.prevent="onSubmit">
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

export default {
  components: { FormTextField, ValidationObserver },
  props: ["isRegister"],
  data() {
    return {
      email: "",
      password: "",
      user: "",
    };
  },
  methods: {
    async onSubmit() {
      const success = await this.$refs.form.validate();
      if (!success) {
        alert("WRONG!");
        return;
      }
      console.log(this.user, this.email, this.password);
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
