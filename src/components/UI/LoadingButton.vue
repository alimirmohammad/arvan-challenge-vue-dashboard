<template>
  <b-button :disabled="loading" v-bind="$attrs">
    <b-spinner v-if="loading" variant="light" label="loading" small></b-spinner>
    <slot v-else></slot>
  </b-button>
</template>

<script>
export default {
  name: "LoadingButton",
  props: ["loading", "label"],
};
</script>
