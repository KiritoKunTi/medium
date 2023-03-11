import authApi from '@/api/auth.js'
import {setItem} from '@/helpers/persistentStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null, 
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  } ,
  registerSuccess(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  } ,
  registerFaulire(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  } 
}

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart');
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user);
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit('registerFaulire', result.response.data.errors)
        })
    })
  } 
}

const getters = {
  isSubmitting() {
    return state.isSubmitting;
  }
}

export default {
  state, 
  mutations,
  actions,
  getters,
}