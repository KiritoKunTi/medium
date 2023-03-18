import addToFavoritesApi from '@/api/addToFavorites'

export const mutationTypes = {
  addToFavoriteStart: '[favorite] add to favorite start',
  addToFavoriteSuccess: '[favorite] add to favorite Success',
  addToFavoriteFailure: '[favorite] add to favorite Failure',
}

export const actionTypes = {
  addToFavorite: '[favorite] add to favorite',
}

const mutations = {
  [mutationTypes.addToFavoriteStart]() {},
  [mutationTypes.addToFavoriteSuccess]() {},
  [mutationTypes.addToFavoriteFailure]() {},
}

const actions = {
  [actionTypes.addToFavorite](context, {slug, isFavorited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoriteStart)
      const promise = isFavorited
        ? addToFavoritesApi.dislike(slug)
        : addToFavoritesApi.like(slug)
      promise
        .then((article) => {
          context.commit(mutationTypes.addToFavoriteSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoriteFailure)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
