<template>
  <div class="header container">
    <p class="header-logo logo pointer" @click="this.$router.push({ name: 'globalFeed' })">medium</p>
    <div class="switch">
      <p class="home-item pointer mr-13" @click="this.$router.push({ name: 'globalFeed' })">Home</p>
      <template v-if="isLoggedIn">
        <div class="menu logged">
          <p class="menu-item pointer" @click="this.$router.push({ name: 'createArticle' })">
            <img src="@/assets/images/edit-svgrepo-com.svg" alt="img" class="item-img">
            <span>New article</span>
          </p>
          <p class="menu-item pointer" @click="this.$router.push({ name: 'settings' })">
            <img src="@/assets/images/settings-svgrepo-com.svg" alt="img" class="item-img">
            <span>Settings</span>
          </p>
          <p class="menu-item pointer"
            @click="this.$router.push({ name: 'userProfile', params: { slug: currentUser.username } })">
            <img :src="currentUser.image" alt="profile" class="profile-img">
            <span>{{ currentUser.username }}</span>
          </p>
          <button class="btn btn-outline-danger" @click="logout">
            Log Out
          </button>
        </div>
      </template>
      <template v-if="isAnonymous">
        <div class="menu not-logged">
          <p class="menu-item pointer" active-class="active" @click="this.$router.push({ name: 'login' })">Sign in</p>
          <p class="menu-item pointer" active-class="active" @click="this.$router.push({ name: 'register' })">Sign up</p>
        </div>
      </template>
    </div>
  </div>
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

<style lang='scss' scoped>
.active {
  color: #373a3c;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 15px;

  .logo {}

  .switch {
    display: flex;
    align-items: center;

    .home-item {
      color: rgba(0, 0, 0, .3);

      &:hover {
        color: rgba(0, 0, 0, .8);
      }
    }

    .logged {}

    .not-logged {}

    .menu {
      display: flex;
      align-items: center;
      gap: 13px;

      .menu-item {
        display: flex;
        align-items: center;
        gap: 4px;
        color: rgba(0, 0, 0, .3);

        &:hover {
          color: rgba(0, 0, 0, .8);
        }

        .item-img {
          width: 16px;
          height: 18px;
          color: rgba(0, 0, 0, .3);
        }

        .profile-img {
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>  