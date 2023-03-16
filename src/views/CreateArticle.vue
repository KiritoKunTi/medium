<template>
  <article-form :initial-values="initialValues" :errors="validationErrors" :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit" />
</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'
import { mapState } from 'vuex';
import { actionTypes } from '@/store/modules/createArticle';

export default {
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  components: {
    ArticleForm,
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors,
    })
  },
  methods: {
    onSubmit(articleInput) {
      this.$store.dispatch(actionTypes.createArticle, { articleInput }).then(article => {
        this.$router.push({ name: 'article', params: { slug: article.slug } })
      })
    }
  }
}
</script>