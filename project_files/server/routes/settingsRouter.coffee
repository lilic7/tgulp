EmissionType = require '../models/Settings/emissionType'

module.exports = (app, express) ->
  SettingsRouter = express.Router()

  SettingsRouter.get "/", (req, res) ->
    res.render 'pages/settings'

  SettingsRouter.get "/emisiuni/types", (req, res) ->
    EmissionType.find (err, types) ->
      res.send err if err
      res.json types

  SettingsRouter.post "/emisiuni/types/add", (req, res) ->
    type = new EmissionType()
    type._id = req.body.tname
    type.save (err) ->
      res.send err if err
      res.json {"message": "Gen nou creat"}

  SettingsRouter