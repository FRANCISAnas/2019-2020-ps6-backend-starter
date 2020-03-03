const { Router } = require('express')

const { Answer } = require('../../../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Answer.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.getById(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})


router.post('/', (req, res) => {
  try {
    const q = Answer.create(req.body)
    res.status(201).json(q)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.delete(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})


router.put('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.update(req.params.answerId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
