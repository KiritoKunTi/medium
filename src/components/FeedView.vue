<template>
  <fragment-loading v-if="isLoading" />
  <fragment-error v-if="error" />
  <div v-if="feed">
    <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
      <div class="article-meta">
        <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
          <img :src="article.author.image" alt="author">
        </router-link>
        <div class="info">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            {{ article.author.username }}
          </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">
          <add-to-favorites :is-favorited="article.favorited" :article-slug="article.slug"
            :favorites-count="article.favoritesCount" />
        </div>
        <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>READ MORE...</span>
          <article-tags :tag-list="article.tagList" />
        </router-link>
      </div>
    </div>
    <pagination-view :total="feed.articlesCount" :limit="limit" :current-page="currentPage" :url="baseURL" />
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/feed';
import { mapState } from 'vuex';
import PaginationView from '@/components/PaginationView.vue'
import { limit } from '@/helpers/vars'
import queryString from 'query-string'
import FragmentLoading from '@/components/FragmentLoading.vue';
import FragmentError from '@/components/FragmentError.vue';
import ArticleTags from '@/components/ArticleTags.vue';
import AddToFavorites from '@/components/AddToFavorites.vue'

export default {
  props: {
    apiURL: {
      type: String,
      required: true,
    }
  },
  components: {
    PaginationView,
    FragmentError,
    FragmentLoading,
    ArticleTags,
    AddToFavorites,
  },
  data() {
    return {
      limit,
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseURL() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    }
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiURL)
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, { apiURL: apiUrlWithParams })
    }
  }
}
</script>