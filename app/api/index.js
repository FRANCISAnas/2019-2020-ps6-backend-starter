const { Router } = require('express') // import des routers
const QuizzesRouter = require('./quizzes') // import des modules
const UserRouter = require('./users')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)

module.exports = router
