const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  audio: {
    type: Sequelize.STRING
  },
  slouch: {
    type: Sequelize.FLOAT
  },
  transcript: {
    type: Sequelize.TEXT
  },
  fillerCount: {
    type: Sequelize.INTEGER
  }
})

module.exports = Video
