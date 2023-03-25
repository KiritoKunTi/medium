<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: 'globalFeed' }" class="navbar-brand">
        medium
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link :to="{ name: 'globalFeed' }" class="nav-link">
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link :to="{ name: 'createArticle' }" class="nav-link">
              <i class="ion-compose" /> &nbsp; New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'settings' }" class="nav-link">
              <i class="ion-gear-a" /> &nbsp; Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'userProfile', params: { slug: currentUser.username } }" class="nav-link">
              <img class="user-pic" :src="currentUser.image" alt="profilePicture">
              &nbsp; {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-danger" @click="logout">
              Log Out
            </button>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">
              Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'register' }" class="nav-link">
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { actionTypes, getterTypes } from '@/store/modules/auth'

export default {
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.logout).then(() => {
        this.$router.push({ name: 'globalFeed' })
      })
    }
  }
}
</script>