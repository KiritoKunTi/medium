<template>
  <div class="auth-page">
    <div class="block">
      <p class="title">Sign up</p>
      <p class="link pointer" @click="this.$router.push({ name: 'login' })">Have an account?</p>
      <!-- VALIDATION ERRORS -->
      <form class="register-form" @submit.prevent="register()">
        <input class="register-input form-control" type="text" placeholder="Username" v-model="user.username">
        <input class="register-input form-control" type="email" placeholder="email" v-model="user.email">
        <input class="register-input form-control" type="password" placeholder="password" v-model="user.password">
        <button class="register-btn form-control">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      }
    }
  },
  methods: {
    register() {
      console.log('register');
    }
  }
}
</script>

<style lang="scss" scoped>
$font-sm: 16px;
$font-md: 20px;
$font-lg: 24px;
$mobile: 425px;
$tablet: 768px;
$laptop: 1024px;
$primary-color: #5cb85c;
$secondary-color: #ccc;

.auth-page {
  min-height: 85vh;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .block {
    width: 330px;

    @media (min-width: $laptop) {
      width: 540px;
    }

    @media (min-width: $tablet) {
      width: 440px;
    }

    @media (max-width: $mobile) {
      padding: 0 20px;
    }

    .title {
      font-size: 40px;
      margin-bottom: 8px;
      text-align: center;

      @media (max-width: $mobile) {
        font-size: 28px;
      }
    }

    .link {
      color: #5cb85c;
      text-align: center;
      margin-bottom: 16px;
      font-size: 16px;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 15px;

      &:last-child {
        align-items: flex-end;
      }

      .register-input {
        border: 1px solid rgba(0, 0, 0, .15);
        width: 100%;

        &::placeholder {
          color: #9aa4ac;
          font-weight: 100;
        }
      }

      .register-btn {
        background-color: #5cb85c;
        color: white;
        width: fit-content;

        &:hover,
        &:focus {
          background-color: #4d9e4d;
        }
      }
    }
  }
}
</style>