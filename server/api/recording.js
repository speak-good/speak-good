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

module.exports = router
