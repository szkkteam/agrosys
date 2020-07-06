class Storage {
  constructor() {
    this.token = null
    this.user = null
  }

  doLogin(token, user) {
    this.token = token
    this.user = user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  activateFarm(farm) {
    this.farm = farm
    localStorage.setItem('activeFarm', JSON.stringify(farm))
  }

  doLogout() {
    this.token = null
    this.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getToken() {
    if (!this.token) {
      const token = localStorage.getItem('token')
      // FIXME: this crap is probably indicative of a bug somewhere...
      this.token = token == 'null' || token == 'undefined' ? null : token
    }
    return this.token
  }

  getUser() {
    if (!this.user) {
      let user
      try {
        user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        user = null
      }
      // FIXME: this crap is probably indicative of a bug somewhere...
      this.user = user == 'null' || user == 'undefined' ? null : user
    }
    return this.user
  }

  getActiveFarm() {
    if (!this.farm) {
      let farm
      try {
        farm = JSON.parse(localStorage.getItem('activeFarm'))
      } catch (e) {
        farm = null
      }      
      this.farm = farm
    }
    return this.farm
  }
  
}

export default new Storage()
