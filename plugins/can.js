
export default ({ store }, inject) => {
  inject('can', (permissions) => {
    const userPermissions = store.getters['user/profile'].permissions

    let canEnter = false

    if (!userPermissions || !permissions) {
      return canEnter
    }

    if (!Array.isArray(permissions)) {
      canEnter = userPermissions.includes(permissions)
    } else {
      permissions.forEach((permission) => {
        if (userPermissions.includes(permission)) {
          canEnter = true
        }
      })
    }
    return canEnter
  })
}
