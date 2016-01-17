module.exports = (app, express) ->
  ecouRouter = express.Router()

  ecouRouter.get '/', (req, res) ->
    res.send "Program pentru Ecoul Sportului"
    return

  ecouRouter