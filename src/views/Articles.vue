<template>
  <div>
    <h1 class="title mb-7">All Posts</h1>
    <div>
      <b-table sticky-header :items="items" head-variant="light"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          "#": 1,
          Title: "Article title",
          Author: "@author_username",
          Tags: "list of tags",
          Excerpt: "First 20 words of article body",
          Created: "June 11 ,2019",
        },
        {
          "#": 2,
          Title: "Article title",
          Author: "@author_username",
          Tags: "list of tags",
          Excerpt: "First 20 words of article body",
          Created: "June 11 ,2019",
        },
        {
          "#": 3,
          Title: "Article title",
          Author: "@author_username",
          Tags: "list of tags",
          Excerpt: "First 20 words of article body",
          Created: "June 11 ,2019",
        },
      ],
    };
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
