<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <article-actions :article="article" :is-author="isAuthor" />
      </div>
    </div>
    <div class="container page">
      <fragment-loading v-if="isLoading" />
      <fragment-error v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <article-tags :tag-list="article.tagList" />
        </div>
      </div>
      <hr>
      <div class="article-actions">
        <article-actions :article="article" :is-author="isAuthor" v-if="article" />
      </div>
    </div>
  </div>
</template>

<script>
import FragmentLoading from '@/components/FragmentLoading.vue';
import FragmentError from '@/components/FragmentLoading.vue';
import ArticleTags from '@/components/ArticleTags.vue';
import ArticleActions from '@/components/ArticleActions.vue';
import { actionTypes as articleActionTypes } from '@/store/modules/article';
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import { mapGetters, mapState } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, { slug: this.$route.params.slug });
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },
  components: {
    FragmentLoading,
    FragmentError,
    ArticleTags,
    ArticleActions,
  },
  methods: {}
}
</script>