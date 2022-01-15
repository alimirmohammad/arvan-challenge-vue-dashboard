<template>
  <div>
    <validation-provider
      :name="name"
      :rules="rules"
      v-slot="{ errors }"
      :mode="mode"
    >
      <label :for="name" :class="{ wrong: errors.length > 0 }">{{
        label
      }}</label>
      <b-form-textarea
        @input="handleInput"
        :value="value"
        :state="errors.length > 0 ? false : null"
        :id="name"
        :type="type"
        trim
        :rows="rows"
        no-resize
      ></b-form-textarea>
      <b-form-invalid-feedback :state="errors.length > 0 ? false : null">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </validation-provider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "FormTextAreaField",
  props: ["name", "rules", "label", "value", "type", "mode", "rows"],
  components: { ValidationProvider },
  methods: {
    handleInput(text) {
      this.$emit("input", text);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.form-control.is-invalid {
  background-image: none;
}
.wrong {
  color: $red;
}
</style>
