export const state = () => ({
  username: null
})

export const mutations = {
  setUsername(state, payload) {
    state.username = payload
  }
}

export const getters = {
  getUsername(state) {
    return state.username
  }
}
