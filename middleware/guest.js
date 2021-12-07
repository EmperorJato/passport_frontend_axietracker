export default ({ store, redirect }) => {
  if (store.state.user.access_token) {
    return redirect('/dashboard')
  }
}
