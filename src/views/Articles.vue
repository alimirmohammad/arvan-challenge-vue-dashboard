<template>
  <div>
    <h1 class="title mb-7">All Posts</h1>
    <div>
      <b-table
        sticky-header
        :items="items"
        :fields="fields"
        head-variant="light"
      >
        <template #cell(actions)="data">
          <b-dropdown text="..." variant="info">
            <b-dropdown-item
              :to="{ name: EDIT_ROUTE, params: { slug: data.item.slug } }"
            >
              Edit
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-b-modal.delete-modal
              @click="setSlug(data.item.slug)"
            >
              Delete
            </b-dropdown-item-button>
          </b-dropdown>
        </template>
      </b-table>
    </div>
    <b-modal
      id="delete-modal"
      centered
      title="Delete Article"
      cancel-title="No"
      ok-title="Yes"
      cancel-variant="light"
      ok-variant="danger"
      @ok="handleDelete"
    >
      <p class="my-4">Are you sure to delete Article?</p>
    </b-modal>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";
import { deleteArticle, getAllArticles } from "../api/articles-api";
import { mapArticleDtoToTableRow, tableFields } from "../utils/table-utils";
import extractErrorMessage from "../utils/extractErrorMessage";
export default {
  data() {
    return {
      items: [],
      fields: tableFields,
      EDIT_ROUTE: ROUTE_NAMES.EDIT_ARTICLE,
      slug: "",
    };
  },
  async mounted() {
    this.getArticles();
  },
  methods: {
    setSlug(slug) {
      this.slug = slug;
    },
    async getArticles() {
      try {
        const res = await getAllArticles();
        this.items = res.data.articles.map(mapArticleDtoToTableRow);
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
    },
    async handleDelete() {
      try {
        await deleteArticle(this.slug);
        await this.getArticles();
        this.$emit("success", "deleted");
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.title {
  color: $black;
  font-size: 40px;
  line-height: 48px;
}
</style>
