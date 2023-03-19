import userProfileApi from '@/api/userProfile'

const state = {
  isLoading: false,
  data: null,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] get userProfile start',
  getUserProfileSuccess: '[userProfile] get userProfile success',
  getUserProfileFailure: '[userProfile] get userProfile failure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] get UserProfile',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((profile) => {
          context.commit(mutationTypes.getUserProfileSuccess, profile)
          resolve(profile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
