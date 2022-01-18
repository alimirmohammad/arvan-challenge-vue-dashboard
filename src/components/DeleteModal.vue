<template>
  <b-modal
    id="delete-modal"
    centered
    title="Delete Article"
    @ok="$emit('delete-article')"
  >
    <p class="my-4">Are you sure to delete Article?</p>
    <template #modal-footer="{ ok, cancel }">
      <modal-footer @cancel="cancel" @ok="ok"></modal-footer>
    </template>
  </b-modal>
</template>

<script>
import ModalFooter from "./ModalFooter.vue";
export default {
  components: { ModalFooter },
  name: "DeleteModal",
  emits: ["delete-article"],
};
</script>
