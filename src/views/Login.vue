<template>
  <div class="page">
    <b-form class="form">
      <form-text-field
        name="email"
        rules="required|email"
        label="Email"
        v-model="email"
        type="email"
      ></form-text-field>
      <form-text-field
        name="password"
        rules="required"
        label="Password"
        v-model="password"
        type="password"
      ></form-text-field>
    </b-form>
    <b-button variant="primary">Login</b-button>
  </div>
</template>

<script>
import FormTextField from "../components/FormTextField.vue";

export default {
  components: { FormTextField },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>
