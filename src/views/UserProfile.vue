<template>
  <FragmentLoading v-if="isLoading" />
  <FragmentError v-if="error" :validation-errors="error" />
  <div class="profile-page" v-if="profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" alt="profileImage" class="user-img">
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div>
              FOLLOW BUTTON
              <router-link v-if="isCurrentUser" class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }">
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link class="nav-link" :class="{ 'active': routeName === 'userProfile' }"
                  :to="{ name: 'userProfile', params: { slug: profile.username } }">
                  My Post
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" :class="{ 'active': routeName === 'userProfileFavorites' }"
                  :to="{ name: 'userProfileFavorites', params: { slug: profile.username } }">
                  Favorite Posts
                </router-link>
              </li>
            </ul>
          </div>
          <feed-view :apiURL="apiURL" />
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import FragmentError from '@/components/FragmentError.vue';
import FragmentLoading from '@/components/FragmentLoading.vue';
import FeedView from '@/components/FeedView.vue';
import { mapState, mapGetters } from 'vuex';
import { actionTypes as userProfileActionTypes } from '@/store/modules/userProfile';
import { getterTypes as authGetterTypes } from '@/store/modules/auth';

export default {
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      profile: state => state.userProfile.data,
      error: state => state.userProfile.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isCurrentUser() {
      if (!this.currentUser || !this.profile) {
        return false;
      }
      return this.currentUser.username === this.profile.username;
    },
    apiURL() {
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    routeName() {
      return this.$route.name
    }
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    }
  },
  mounted() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, { slug: this.userProfileSlug });
    }
  },
  components: { FragmentLoading, FragmentError, FeedView }
}
</script>