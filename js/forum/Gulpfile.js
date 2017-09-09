var gulp = require('flarum-gulp')

gulp({
  modules: {
    'Reflar/twofactor': [
      'src/**/*.js'
    ]
  }
})
