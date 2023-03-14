import popularTagsApi from '@/api/popularTags'

const state = {
  isLoading: false,
  data: null,
  error: null,
}

export const mutationTypes = {
  getTagStart: '[tag] get tag start',
  getTagSuccess: '[tag] get tag success',
  getTagFailure: '[tag] get tag failure',
}

export const actionTypes = {
  getPopularTags: '[tag] get popular tags',
}

const mutations = {
  [mutationTypes.getTagStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getTagSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getTagFailure](state) {
    state.isLoading = false;
  }
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getTagStart);
      popularTagsApi
        .getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getTagSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getTagFailure)
        })
    })
    
  }
}

export default {
  state,
  mutations,
  actions,
}