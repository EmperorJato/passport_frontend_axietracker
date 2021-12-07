export const state = () => ({
  isLoggedIn: false,
  access_token: sessionStorage.getItem('access_token') || null,
  profile: JSON.parse(sessionStorage.getItem('profile')) || {},
  userProfile: {},
  pieSeries: []
})

export const getters = {

  access_token (state) {
    return state.access_token
  },

  isLoggedIn (state) {
    return state.isLoggedIn
  },

  profile (state) {
    return state.profile
  },

  userProfile (state) {
    return state.userProfile
  }

}

export const mutations = {

  SET_ACCESS_TOKEN (state, payload) {
    state.access_token = payload
  },

  SET_LOGGED_IN (state, payload) {
    state.isLoggedIn = payload
  },

  SET_PROFILE (state, payload) {
    state.profile = payload
  },

  SET_USER_PROFILE (state, payload) {
    state.userProfile = payload
  },

  SET_PIE_STATS (state, payload) {
    state.pieSeries = payload
  }
}

export const actions = {

  async setLoggedInState ({ commit }) {
    if (sessionStorage.getItem('access_token')) {
      await commit('SET_LOGGED_IN', true)
      return true
    } else {
      await commit('SET_LOGGED_IN', false)
      return false
    }
  },

  async setLoggedIn ({ commit }, payload) {
    await commit('SET_ACCESS_TOKEN', sessionStorage.getItem('access_token'))
    await commit('SET_LOGGED_IN', payload)
  },

  async setProfile ({ commit }) {
    const setProfile = await this.$axios.get('user')
    sessionStorage.setItem('profile', JSON.stringify(setProfile.data))
    commit('SET_PROFILE', setProfile.data)
    return setProfile
  },

  async setUserProfile ({ commit }, payload) {
    const setUserProfile = await this.$axios.post('user-profile', { id: payload })
    commit('SET_USER_PROFILE', setUserProfile.data)
    return setUserProfile
  }
}
