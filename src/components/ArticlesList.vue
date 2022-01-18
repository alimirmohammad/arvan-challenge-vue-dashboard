<template>
  <div>
    <h1 class="title mb-7">All Posts</h1>
    <b-table
      :items="items"
      :fields="fields"
      head-variant="light"
      small
      stacked="md"
      :busy="busy"
      id="articles-table"
    >
      <template #table-busy>
        <table-lazy></table-lazy>
      </template>
      <template #cell(actions)="data">
        <table-action-button
          @set-slug="setSlug"
          :slug="data.item.slug"
        ></table-action-button>
      </template>
    </b-table>
    <table-pagination
      :link-gen="linkGen"
      :number-of-pages="totalPages"
    ></table-pagination>
    <delete-modal @delete-article="handleDelete"></delete-modal>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "../constants/routes";
import { deleteArticle, getAllArticles } from "../api/articles-api";
import { mapArticleDtoToTableRow, tableFields } from "../utils/table-utils";
import extractErrorMessage from "../utils/extractErrorMessage";
import TableActionButton from "./TableActionButton.vue";
import TableLazy from "./TableLazy.vue";
import DeleteModal from "./DeleteModal.vue";
import TablePagination from "./TablePagination.vue";
export default {
  name: "ArticlesList",
  props: ["page"],
  components: { TableActionButton, TableLazy, DeleteModal, TablePagination },
  data() {
    return {
      items: [],
      fields: tableFields,
      EDIT_ROUTE: ROUTE_NAMES.EDIT_ARTICLE,
      slug: "",
      busy: false,
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalRows / this.perPage) || 1;
    },
  },
  created() {
    this.validatePageNumberFromUrl(this.page);
    this.getArticles(this.currentPage);
  },
  methods: {
    setSlug(slug) {
      this.slug = slug;
    },
    async getArticles(page) {
      try {
        this.busy = true;
        const res = await getAllArticles({ page, limit: this.perPage });
        this.items = res.data.articles.map((article, index) =>
          mapArticleDtoToTableRow(article, index, page, this.perPage)
        );
        this.totalRows = res.data.articlesCount;
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
      this.busy = false;
    },
    async handleDelete() {
      try {
        await deleteArticle(this.slug);
        await this.getArticles(this.currentPage);
        this.$emit("success", "deleted");
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
    },
    linkGen(pageNum) {
      return pageNum === 1
        ? { name: ROUTE_NAMES.ARTICLES_FIRST_PAGE }
        : { name: ROUTE_NAMES.ARTICLES_PAGE, params: { page: pageNum } };
    },
    validatePageNumberFromUrl(pageNumber) {
      if (!pageNumber) {
        this.currentPage = 1;
        return;
      }
      if (
        typeof pageNumber !== "number" ||
        !Number.isInteger(pageNumber) ||
        pageNumber < 2
      ) {
        this.$router.replace({ name: ROUTE_NAMES.ARTICLES_FIRST_PAGE });
        return;
      }
      this.currentPage = pageNumber;
    },
  },
  watch: {
    page(val) {
      this.validatePageNumberFromUrl(val);
    },
    currentPage(val) {
      this.getArticles(val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.title {
  color: $black;
  font-size: 2.5rem;
  line-height: 3rem;
}
#articles-table {
  border-bottom: 1px solid $gray-500;
  margin-bottom: 3.75rem;
}
</style>
