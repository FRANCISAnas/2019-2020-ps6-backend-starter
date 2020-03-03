const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router()

const { Answer } = require('../../../models')

const AnswersRouter = require('./answers')

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get().map((question) => ({ ...question, answers: Answer.get().filter((answer) => (answer.questionIdi === question.id)) })))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    // eslint-disable-next-line radix
    res.status(200).json({ ...Question.getById(req.params.questionId), answers: Answer.get().filter((answer) => (answer.questionIdi === parseInt(req.params.questionId))) })
  } catch (err) {
    res.status(500).json(err)
  }
})


router.post('/', (req, res) => {
  try {
    const q = Question.create(req.body)
    // si je fais {...req.body, req.params.questionId } je créer un objet à l'intérieur d'un objet et donc c'est pas bon!!
    res.status(201).json(q)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.delete(req.params.questionId))
  } catch (err) {
    res.status(500).json(err)
  }
})


router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.use('/:questionId/answers', AnswersRouter)
module.exports = router
