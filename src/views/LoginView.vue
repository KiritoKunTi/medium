<template>
  <div class="auth-page">
    <div class="block">
      <p class="title">Sign in</p>
      <p class="link pointer" @click="this.$router.push({ name: 'register' })">Need an account?</p>
      <!-- VALIDATION ERRORS -->
      <validation-errors v-if="validationErrors" :validation-errors="validationErrors" />
      <form class="register-form" @submit.prevent="onSubmit()">
        <input class="register-input form-control" type="email" placeholder="email" v-model="email">
        <input class="register-input form-control" type="password" placeholder="password" v-model="password">
        <button class="register-btn form-control" :disabled="isSubmitting">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors.vue';
import { actionTypes } from '@/store/modules/auth';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  components: {
    ValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors,
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push({ name: 'globalFeed' })
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