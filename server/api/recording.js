const router = require('express').Router()
const {Recording, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const recordings = await Recording.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(recordings)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const recordings = await Recording.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json(recordings)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const recordings = await Recording.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json(recordings)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {video, slouch, transcript, fillerCount} = req.body
    const recording = await Recording.create({
      video: video,
      slouch: slouch,
      transcript: transcript,
      fillerCount: fillerCount,
      userId: req.user.id
    })
    res.json(recording)
  } catch (err) {
    next(err)
  }
})

module.exports = router
