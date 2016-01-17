module.exports = (app, express) ->
  stiriRouter = express.Router()

  stiriRouter.get '/', (req, res) ->
    res.send "Vezi promterul pentru ultimul buletin de stiri"
    return

  stiriRouter