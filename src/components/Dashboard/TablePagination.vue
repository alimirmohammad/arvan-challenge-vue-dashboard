<template>
  <b-pagination-nav
    v-bind="$attrs"
    align="center"
    aria-controls="articles-table"
    hide-goto-end-buttons
    use-router
  >
    <template #prev-text><span class="text-secondary">&lt;</span></template>
    <template #next-text><span class="text-secondary">&gt;</span></template>
    <template #page="{ page, active }">
      <span v-if="active" class="text-white">{{ page }}</span>
      <span v-else class="text-secondary">{{ page }}</span>
    </template>
  </b-pagination-nav>
</template>

<script>
export default {
  name: "TablePagination",
};
</script>
