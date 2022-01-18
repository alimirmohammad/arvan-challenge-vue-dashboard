<template>
  <div class="btn-container">
    <b-button
      variant="outline-white"
      class="no actions"
      @click="$emit('cancel')"
    >
      No
    </b-button>
    <b-button class="actions" variant="danger" @click="$emit('ok')"
      >Yes</b-button
    >
  </div>
</template>

<script>
export default {
  name: "ModalFooter",
  emits: ["cancel, ok"],
};
</script>

<style lang="scss" scoped>
.no {
  border: 1px solid #dddddd;
}
.actions {
  width: 80px;
  height: 40px;
}
.btn-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
