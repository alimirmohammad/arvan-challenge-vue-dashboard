<template>
  <b-button
    variant="primary"
    class="submit-btn"
    :type="type"
    :disabled="loading"
  >
    <b-spinner v-if="loading" variant="light" label="loading" small></b-spinner>
    <span v-else>{{ label }}</span>
  </b-button>
</template>

<script>
export default {
  name: "LoadingButton",
  props: ["loading", "type", "label"],
};
</script>

<style lang="scss" scoped>
.submit-btn {
  width: 100px;
}
</style>
