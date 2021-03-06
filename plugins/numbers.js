import Vue from 'vue'

Vue.component('AnimatedNumber', {
  props: { number: { default: 0 } },

  data () {
    return {
      displayNumber: 0,
      interval: false
    }
  },

  watch: {
    number () {
      clearInterval(this.interval)

      if (this.number === this.displayNumber) {
        return
      }

      this.interval = window.setInterval(() => {
        if (this.displayNumber !== this.number) {
          let change = (this.number - this.displayNumber) / 10
          change = change >= 0 ? Math.ceil(change) : Math.floor(change)
          this.displayNumber = this.displayNumber + change
        }
      }, 50)
    }
  },

  created () {
    this.displayNumber = this.number ? this.number : 0
  },

  template: '<span>{{ displayNumber }}</span>'
})
