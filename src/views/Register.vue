<template>
  <auth-form :isRegister="true" />
</template>

<script>
import AuthForm from "../components/AuthForm.vue";
export default {
  name: "Register",
  components: { AuthForm },
};
</script>
