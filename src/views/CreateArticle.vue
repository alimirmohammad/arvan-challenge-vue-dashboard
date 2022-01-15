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
              :disabled="false"
            >
              <b-spinner
                v-if="false"
                variant="light"
                label="loading"
                small
              ></b-spinner>
              Submit
            </b-button>
          </b-form>
        </validation-observer>
      </section>
      <section class="tag-section">
        <validation-observer ref="form" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(addTag)">
            <form-text-field
              name="tags"
              rules="required"
              label="Tags"
              v-model="tag"
              type="text"
              class="mb-4"
              mode="passive"
            ></form-text-field>
          </b-form>
        </validation-observer>
        <div class="tags-container">
          <b-form-checkbox-group
            v-model="selected"
            :options="sortedOptions"
            name="tags"
            stacked
          ></b-form-checkbox-group>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import FormTextField from "../components/FormTextField.vue";
import { createArticle, getAllTags } from "../api/articles-api";
import FormTextAreaField from "../components/FormTextAreaField.vue";
import { ROUTE_NAMES } from "../constants/routes";

export default {
  components: { FormTextField, ValidationObserver, FormTextAreaField },
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tag: "",
      selected: [],
      options: [],
    };
  },
  computed: {
    sortedOptions() {
      const sortedArray = [...this.options];
      return sortedArray.sort();
    },
  },
  methods: {
    async onSubmit() {
      try {
        await createArticle({
          title: this.title,
          body: this.body,
          description: this.description,
          tagList: this.selected,
        });
        this.$emit("success", "created");
        this.$router.push({ name: ROUTE_NAMES.ARTICLES_FIRST_PAGE });
      } catch (error) {
        console.log(error);
      }
    },
    addTag() {
      this.options.push(this.tag);
      this.selected.push(this.tag);
      this.tag = "";
      this.$refs.form.reset();
    },
    async getTags() {
      try {
        const res = await getAllTags();
        this.options = res.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getTags();
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
