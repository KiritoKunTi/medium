<template>
  <div>create article
    <article-form :initial-values="initialValues" :errors="validationErrors" :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit" />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm.vue'

export default {
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
    }
  },
  components: {
    ArticleForm,
  },
  methods: {
    onSubmit(data) {
      console.log('create article', data);
    }
  }
}
</script>