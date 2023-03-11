<template>
  <div class="auth-page">
    <div class="block">
      <p class="title">Sign up</p>
      <p class="link pointer" @click="this.$router.push({ name: 'login' })">Have an account?</p>
      <!-- VALIDATION ERRORS -->
      <validation-errors v-if="validationErrors" :validation-errors="validationErrors" />
      <form class="register-form" @submit.prevent="onSubmit()">
        <input class="register-input form-control" type="text" placeholder="Username" v-model="username">
        <input class="register-input form-control" type="email" placeholder="email" v-model="email">
        <input class="register-input form-control" type="password" placeholder="password" v-model="password">
        <button class="register-btn form-control" :disabled="isSubmitting">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors.vue';

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  components: {
    ValidationErrors,
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }
  },
  methods: {
    onSubmit() {
      console.log('start register');
      // this.$store.commit('registerStart');
      this.$store.dispatch('register', {
        email: this.email,
        username: this.username,
        password: this.password,
      }).then(user => {
        console.log('user succesfully registered', user);
        this.$router.push({ name: 'home' })
      });
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

        &:disabled {
          pointer-events: none;
          cursor: not-allowed;
          opacity: 0.65;
          filter: alpha(opacity=65);
          -webkit-box-shadow: none;
          box-shadow: none;
        }

        &:hover,
        &:focus {
          background-color: #4d9e4d;
        }
      }
    }
  }
}
</style>