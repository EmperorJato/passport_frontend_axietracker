export const state = () => ({
  users: [],
  roles: [],
  permissions: []
})

export const getters = {

  users (state) {
    return state.users
  },

  roles (state) {
    return state.roles
  },

  permissions (state) {
    return state.permissions
  }

}

export const mutations = {

  GET_ACCOUNTS (state, payload) {
    state.users = payload
  },

  GET_ROLES (state, payload) {
    state.roles = payload
  },

  GET_PERMISSIONS (state, payload) {
    state.permissions = payload
  },

  ADD_ROLE (state, payload) {
    state.roles.push(payload)
  }

}

export const actions = {
  async getAccounts ({ commit }) {
    const accounts = await this.$axios.get('accounts')
    commit('GET_ACCOUNTS', accounts.data)
    return accounts
  },

  async getRoles ({ commit }) {
    const roles = await this.$axios.get('roles')
    commit('GET_ROLES', roles.data.roles)
    commit('GET_PERMISSIONS', roles.data.permissions)
    return roles
  },

  async saveRoles ({ commit }, payload) {
    const saveRole = await this.$axios.post('roles', payload)
    return saveRole
  },

  async updateRole ({ commit }, payload) {
    const updateRole = await this.$axios.put('user-role/' + payload.id, { role: payload.role })
    return updateRole
  }

}
