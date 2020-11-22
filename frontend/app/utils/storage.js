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

  activateFarm(farm) {
    this.farm = farm
    localStorage.setItem('activeFarm', JSON.stringify(farm))
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
      //this.farm = farm == 'null' || farm == 'undefined' ? null : farm
    }
    return this.farm
  }

  selectSeason(season) {
    this.season = season
    localStorage.setItem('selectSeason', JSON.stringify(season))
  }

  getSelectedSeason() {
    if (!this.season) {
      let season
      try {
        season = JSON.parse(localStorage.getItem('selectSeason'))
      } catch (e) {
        season = null
      }      
      this.season = season
    }
    console.log("Storage season: ", this.season)
    return this.season
  }
  
  storeProductionForm(productionForm) {
    this.productionForm = productionForm
    localStorage.setItem('productionForm', JSON.stringify(productionForm))
  }

  getProductionForm() {
    if (!this.productionForm) {
      let productionForm
      try {
        productionForm = JSON.parse(localStorage.getItem('productionForm'))
      } catch (e) {
        productionForm = null
      }
      this.productionForm = productionForm
    }
    if (this.productionForm) {
      for (var i = 0; i < this.productionForm.tasks.length; ++i) {
        {
          var date = new Date(this.productionForm.tasks[i].startDate) 
          date.setDate(date.getDate());
          //date.setDate(date.getDate() + 7);
          this.productionForm.tasks[i].startDate = date
        }
        {
          var date = new Date(this.productionForm.tasks[i].endDate) 
          date.setDate(date.getDate());
          this.productionForm.tasks[i].endDate = date
        }
      }
    }
    return this.productionForm
  }

  clearProductionForm() {
    this.productionForm = null
    localStorage.removeItem('productionForm')
  }

}

export default new Storage()
