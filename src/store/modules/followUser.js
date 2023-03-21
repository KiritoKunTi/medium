import followUserApi from '@/api/followUser'

export const mutationTypes = {
  followUserStart: '[follow] follow user start',
  followUserSuccess: '[follow] follow user success',
  followUserFailure: '[follow] follow user failure',
}

export const actionTypes = {
  followUser: '[follow] follow user',
}

const mutations = {
  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {},
}

const actions = {
  [actionTypes.followUser](context, {username, isFollowed}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.followUserStart)
      const promise = isFollowed
        ? followUserApi.unfollow(username)
        : followUserApi.follow(username)
      promise
        .then((profile) => {
          context.commit(mutationTypes.followUserSuccess)
          resolve(profile)
        })
        .catch(() => {
          context.commit(mutationTypes.followUserFailure)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
