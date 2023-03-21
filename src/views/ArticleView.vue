<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
            <img :src="article.author.image" alt="auhtor">
          </router-link>
          <div class="info">
            <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }">
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle()">
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
          <span v-if="!isAuthor">
            <follow-user :author="article.author" />
            <add-to-favorites :is-favorited="article.favorited" :article-slug="article.slug"
              :favorites-count="article.favoritesCount" :with-text="true" />
          </span>
        </div>
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
    </div>
  </div>
</template>

<script>
import FragmentLoading from '@/components/FragmentLoading.vue';
import FragmentError from '@/components/FragmentLoading.vue';
import ArticleTags from '@/components/ArticleTags.vue';
import AddToFavorites from '@/components/AddToFavorites.vue';
import FollowUser from '@/components/FollowUser.vue';
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
    AddToFavorites,
    FollowUser,
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch(articleActionTypes.deleteArticle, { slug: this.$route.params.slug })
        .then(() => {
          this.$router.push({ name: 'globalFeed' })
        })
    }
  }
}
</script>