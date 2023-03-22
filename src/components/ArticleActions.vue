<template>
  <div class="article-meta">
    <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
      <img :src="article.author.image" alt="auhtor">
    </router-link>
    <div class="info">
      <router-link :to="{ name: 'userProfile', params: { slug: article.author.username } }">
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ $filters.dateToString(article.createdAt) }}</span>
    </div>
    <span v-if="isAuthor">
      <router-link class="btn btn-outline-secondary btn-sm" :to="{ name: 'editArticle', params: { slug: article.slug } }">
        <i class="ion-edit" />
        Edit Article
      </router-link>&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle()">
        <i class="ion-trash-a" />
        Delete Article
      </button>
    </span>
    <span v-if="!isAuthor">
      <follow-user :author="article.author" /> &nbsp;
      <add-to-favorites :is-favorited="article.favorited" :article-slug="article.slug"
        :favorites-count="article.favoritesCount" :with-text="true" />
    </span>
  </div>
</template>

<script>
import FollowUser from '@/components/FollowUser.vue'
import AddToFavorites from '@/components/AddToFavorites.vue'
import { actionTypes as articleActionTypes } from '@/store/modules/article';


export default {
  components: {
    FollowUser,
    AddToFavorites,
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
    isAuthor: {
      type: Boolean,
      required: true,
    }
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