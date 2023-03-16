<template>
  <div>
    <fragment-loading v-if="isLoading" />
    <article-form v-if="initialValues" :initialValues="initialValues" :errors="errors" :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/editArticle';
import ArticleForm from '@/components/ArticleForm.vue';
import FragmentLoading from '@/components/FragmentLoading.vue';

export default {
  components: {
    FragmentLoading,
    ArticleForm,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, { slug: this.$route.params.slug })
  },
  computed: {
    ...mapState({
      article: state => state.editArticle.article,
      isSubmitting: state => state.editArticle.isSubmitting,
      errors: state => state.editArticle.validationErrors,
      isLoading: state => state.editArticle.isLoading,
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionTypes.editArticle, { slug: this.$route.params.slug, articleInput })
        .then(article => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
        })
    }
  }
}
</script>