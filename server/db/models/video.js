const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  slouch: {
    type: Sequelize.FLOAT
  },
  transcript: {
    type: Sequelize.TEXT
  }
})

module.exports = Video
