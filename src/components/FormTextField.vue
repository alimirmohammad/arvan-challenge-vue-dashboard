<template>
  <div>
    <validation-provider :name="name" :rules="rules" v-slot="{ errors }">
      <label :for="name">{{ label }}</label>
      <b-form-input
        @input="handleInput"
        :value="value"
        :state="errors.length > 0 ? false : null"
        :id="name"
        :type="type"
      ></b-form-input>
      <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </validation-provider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "FormTextField",
  props: ["name", "rules", "label", "value", "type"],
  components: { ValidationProvider },
  methods: {
    handleInput(text) {
      this.$emit("input", text);
    },
  },
};
</script>
