import authApi from '@/api/auth.js'
import {setItem} from '@/helpers/persistentStorage'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null, 
}


export const mutationTypes = {
  // REGISTER
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFaulire: '[auth] registerFaulire',
  // LOGIN
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFaulire: '[auth] loginFaulire',
  // GET CURRENT USER
  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFaulire: '[auth] getCurrentUserFaulire',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
}
 
const mutations = {
  // REGISTER
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
  // LOGIN
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
  // GET CURRENT USER
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFaulire](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
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
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(mutationTypes.loginFaulire, result.response.data.errors);
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFaulire);
        })
    })
  },
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