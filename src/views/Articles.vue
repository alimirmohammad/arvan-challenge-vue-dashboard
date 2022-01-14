<template>
  <div>
    <h1 class="title mb-7">All Posts</h1>
    <div>
      <b-table sticky-header :items="items" head-variant="light"></b-table>
    </div>
  </div>
</template>

<script>
import { getAllArticles } from "../api/articles-api";
import { mapArticleDtoToTableRow } from "../utils/data-mapping";
export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    try {
      const res = await getAllArticles();
      this.items = res.data.articles.map(mapArticleDtoToTableRow);
    } catch (error) {
      console.log(error);
    }
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
