<template>
  <b-dropdown text="..." variant="info" class="table-actions-cell">
    <b-dropdown-item :to="{ name: EDIT_ROUTE, params: { slug } }">
      Edit
    </b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button
      v-b-modal.delete-modal
      @click="$emit('set-slug', slug)"
    >
      Delete
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";

export default {
  name: "TableActionButton",
  emits: ["set-slug"],
  props: ["slug"],
  data() {
    return {
      EDIT_ROUTE: ROUTE_NAMES.EDIT_ARTICLE,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.table-actions-cell {
  height: 40px;
  &::v-deep .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 21px;
    padding-left: 10px;
    padding-right: 18px;
    color: $white;
  }
}
</style>
