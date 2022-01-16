<template>
  <div>
    <h1>New Article</h1>
    <div class="wrapper">
      <section class="article-section">
        <validation-observer v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <form-text-field
              name="title"
              rules="required"
              label="Title"
              v-model="title"
              type="text"
              class="mb-4"
            ></form-text-field>
            <form-text-field
              name="description"
              rules="required"
              label="Description"
              v-model="description"
              type="text"
              class="mb-4"
            ></form-text-field>
            <form-text-area-field
              name="body"
              rules="required"
              label="Body"
              v-model="body"
              type="text"
              class="mb-7"
              rows="8"
            ></form-text-area-field>
            <b-button
              variant="primary"
              class="submit-btn"
              type="submit"
              :disabled="loading"
            >
              <b-spinner
                v-if="loading"
                variant="light"
                label="loading"
                small
              ></b-spinner>
              <span v-else>Submit</span>
            </b-button>
          </b-form>
        </validation-observer>
      </section>
      <tags-selector
        :selected="selected"
        @change-selected-tags="handleSelectTags"
      ></tags-selector>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import FormTextField from "../components/FormTextField.vue";
import { getArticleBySlug, writeArticle } from "../api/articles-api";
import FormTextAreaField from "../components/FormTextAreaField.vue";
import TagsSelector from "../components/TagsSelector.vue";
import { ROUTE_NAMES } from "../constants/routes";
import extractErrorMessage from "../utils/extractErrorMessage";

export default {
  name: "CreateArticle",
  components: {
    FormTextField,
    ValidationObserver,
    FormTextAreaField,
    TagsSelector,
  },
  data() {
    return {
      title: "",
      description: "",
      body: "",
      selected: [],
      article: null,
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      try {
        await writeArticle({
          title: this.title,
          body: this.body,
          description: this.description,
          tagList: this.selected,
          slug: this.$route.params.slug,
        });
        this.$emit("success", this.article ? "updated" : "created");
        this.$router.push({ name: ROUTE_NAMES.ARTICLES_FIRST_PAGE });
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
        this.loading = false;
      }
    },
    async getArticle(slug) {
      try {
        const res = await getArticleBySlug(slug);
        this.article = res.data.article;
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
    },
    handleSelectTags(newTags) {
      this.selected = newTags;
    },
  },
  mounted() {
    const { slug } = this.$route.params;
    if (!slug) return;
    this.getArticle(slug);
  },
  watch: {
    article(value) {
      if (value) {
        this.title = value.title;
        this.description = value.description;
        this.body = value.body;
        this.selected = value.tagList;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
.wrapper {
  display: flex;
  gap: 30px;
}
.article-section {
  flex: 7;
}
.tag-section {
  flex: 3;
}
.tags-container {
  border: 1px solid $gray-500;
  border-radius: 4px;
  padding: 1rem;
}
.submit-btn {
  width: 100px;
}
</style>
