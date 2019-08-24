const Sequelize = require('sequelize')
const db = require('../db')

const Recording = db.define('recording', {
  video: {
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
  },
  grade: {
    type: Sequelize.STRING
  }
})

module.exports = Recording
