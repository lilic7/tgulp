module.exports = (app, express) ->
  programRouter = express.Router()

  programRouter.get '/', (req, res) ->
    res.render "pages/program_layout"

#Routerul pentru emisiuni
  emisiuniRouter = express.Router()
  emisiuniRouter.get '/', (req, res) ->
    res.render "pages/program_layout"

  emisiuniRouter.get '/add', (req, res) ->
    res.send 'Adauga o noua emisiune'

  programRouter.use '/emisiuni', emisiuniRouter

  programRouter