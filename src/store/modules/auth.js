import authApi from '@/api/auth.js'
import {setItem} from '@/helpers/persistentStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null, 
}


export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFaulire: '[auth] registerFaulire',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFaulire: '[auth] loginFaulire',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
}
 
const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  } ,
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  } ,
  [mutationTypes.registerFaulire](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  } ,
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  } ,
  [mutationTypes.loginFaulire](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.registerFaulire, result.response.data.errors)
        })
    })
  }, 
  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart);
      console.log('start login');
      authApi
        .login(credentials)
        .then(response => {
          console.log('start login api');
          context.commit(mutationTypes.loginSuccess, response.data.user);
          console.log('logged in success', response.data.user);
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user);
        })
        .catch(result => {
          console.log('failed');
          context.commit(mutationTypes.loginFaulire, result.response.data.errors);
        })
    })
  } 
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: state => {
    return state.isLoggedIn === false;
  },
}

export default {
  state, 
  mutations,
  actions,
  getters,
}