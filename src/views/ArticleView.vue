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
      <div class="article-actions" v-if="article">
        <article-actions :article="article" :is-author="isAuthor"/>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          
          <div v-if="isLoggedIn">
            <form class="card comment-form" @submit.prevent="addComment()">
              <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody" required></textarea>
              </div>
              <div class="card-footer">
                <img :src="currentUser.image" class="comment-author-img">
                <button class="btn btn-sm btn-primary" type="submit">
                Post Comment
                </button>
              </div>
            </form>

            <fragment-comment v-for="comment in comments" :key="comment.id" :comment="comment" @handleDelete="deleteComment"/>

          </div>  
          <p v-if="isAnonymous">
            <router-link :to="{name: 'login'}">Sign in</router-link>
            or
            <router-link :to="{name: 'register'}">sign up</router-link>
            to add comments on this article.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FragmentLoading from '@/components/FragmentLoading.vue';
import FragmentError from '@/components/FragmentLoading.vue';
import ArticleTags from '@/components/ArticleTags.vue';
import ArticleActions from '@/components/ArticleActions.vue';
import FragmentComment from '@/components/FragmentComment.vue';
import { actionTypes as articleActionTypes } from '@/store/modules/article';
import { actionTypes as commentActionTypes } from '@/store/modules/comments';
import { getterTypes as authGetterTypes } from '@/store/modules/auth'
import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      commentBody: '',
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, { slug: this.getSlug });
    this.fetchComments();
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data,

      comments: state => state.comments.data,
      isCommentsLoading: state => state.comments.isLoading,
      isCommentsSubmitting: state => state.comments.isSubmitting,
      commentsError: state => state.comments.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
      isLoggedIn: authGetterTypes.isLoggedIn,
      isAnonymous: authGetterTypes.isAnonymous,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
    getSlug() {
      return this.$route.params.slug
    }
  },
  components: {
    FragmentLoading,
    FragmentError,
    ArticleTags,
    ArticleActions,
    FragmentComment,
  },
  methods: {
    addComment() {
      this.$store.dispatch(commentActionTypes.addComment, {slug: this.getSlug, commentBody: this.commentBody}).then(() => {
        this.commentBody = '';
        this.fetchComments();
      })
    },
    deleteComment(id) {
      this.$store.dispatch(commentActionTypes.deleteComment, {slug: this.getSlug, commentId: id}).then(() => {
        this.fetchComments();
      })
    },
    fetchComments() {
      this.$store.dispatch(commentActionTypes.getComments, { slug: this.getSlug });
    }
  }
}
</script>