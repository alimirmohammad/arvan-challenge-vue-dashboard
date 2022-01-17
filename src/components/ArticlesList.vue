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
        <div class="text-center text-primary my-4">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(actions)="data">
        <b-dropdown text="..." variant="info" class="table-actions-cell">
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
    <b-pagination-nav
      :link-gen="linkGen"
      :number-of-pages="totalPages"
      aria-controls="articles-table"
      hide-goto-end-buttons
      use-router
    ></b-pagination-nav>
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
  name: "ArticlesList",
  props: ["page"],
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
  font-size: 40px;
  line-height: 48px;
}
.table-actions-cell {
  height: 40px;
  & > .btn.btn-info {
    display: flex;
    align-items: center;
    gap: 21px;
    padding-left: 10px;
    padding-right: 18px;
    color: $white;
  }
}
</style>
