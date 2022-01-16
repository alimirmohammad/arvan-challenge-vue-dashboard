<template>
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
        :checked="selected"
        @change="handleSelectTags"
        :options="sortedOptions"
        name="tags"
        stacked
      ></b-form-checkbox-group>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import FormTextField from "../components/FormTextField.vue";
import { getAllTags } from "../api/articles-api";
import extractErrorMessage from "../utils/extractErrorMessage";

export default {
  name: "TagsSelector",
  components: { FormTextField, ValidationObserver },
  props: ["selected"],
  emits: ["fail", "change-selected-tags"],
  data() {
    return {
      tag: "",
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
    addTag() {
      this.options.push(this.tag);
      this.$emit("change-selected-tags", this.selected.concat(this.tag));
      this.tag = "";
      this.$refs.form.reset();
    },
    async getTags() {
      try {
        const res = await getAllTags();
        this.options = res.data.tags;
      } catch (error) {
        this.$emit("fail", extractErrorMessage(error));
      }
    },
    handleSelectTags(newTags) {
      this.$emit("change-selected-tags", newTags);
    },
  },
  mounted() {
    this.getTags();
  },
};
</script>
