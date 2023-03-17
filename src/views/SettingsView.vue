<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <validation-errors v-if="errors" :validation-errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.image"
                  placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.username" placeholder="Username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="form.bio"
                  placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input type="password" class="form-control form-control-lg" v-model="form.password"
                  placeholder="New Password">
              </fieldset>
              <button type="submit" class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getterTypes as authGetterTypes, actionTypes as authActionTypes } from '@/store/modules/auth';
import ValidationErrors from '@/components/ValidationErrors.vue';

export default {
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      errors: state => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {
      return {
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: '',
      }
    }
  },
  components: {
    ValidationErrors
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, { currentUserInput: this.form })
    },
  }
}
</script>