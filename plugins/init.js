export default ({ store }) => {
  store.dispatch('user/setLoggedInState').then((res) => {
    if (res === true) {
      store.dispatch('user/setProfile')
    }
  })
}
