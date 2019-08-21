const router = require('express').Router()
const {Video, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(videos)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json(video)
  } catch (err) {
    next(err)
  }
})

module.exports = router
