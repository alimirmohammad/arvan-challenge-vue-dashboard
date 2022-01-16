<template>
  <b-button :disabled="loading" v-bind="$attrs">
    <b-spinner v-if="loading" variant="light" label="loading" small></b-spinner>
    <span v-else>{{ label }}</span>
  </b-button>
</template>

<script>
export default {
  name: "LoadingButton",
  props: ["loading", "label"],
};
</script>
