EmissionType = require '../models/Settings/emissionType'
EmissionDefault = require '../models/Settings/emissionDefault'
hours = new Array()

module.exports = (app, express) ->
  SettingsRouter = express.Router()

  SettingsRouter.get "/", (req, res) ->
    res.render 'pages/settings'

  SettingsRouter.get "/emisiuni/types", (req, res) ->
    EmissionType.find (err, types) ->
      res.send err if err
      res.json types

  SettingsRouter.post "/emisiuni/types", (req, res) ->
    type = new EmissionType()
    type.name = req.body.tname
    type.save (err) ->
      res.send err if err
      res.json {"message": "Gen nou creat"}

  SettingsRouter.get "/emisiuni/defaults", (req, res) ->
    res.render 'pages/default-emission-add'

  SettingsRouter.use (req, res, next) ->
    body = req.body
    dayTimeObj(i, body) for i in [1, 2, 3, 4, 5, 6, 7]
    req.hours = hours;
    hours = {}
    next()
    return

  SettingsRouter.post "/emisiuni/defaults/add", (req, res) ->
    emDefault = new EmissionDefault()
    emDefault.defaultName = req.body.defName
    emDefault.defaultType = req.body.defType
    emDefault.defaultLength = req.body.defLength
    #emDefault.defaultProgram = getTimeAndDays req
    #emDefault.save (err) ->
     # res.send err if err
    #res.json {"message": "Model de emisiune salvat"}
    res.json {body: req.body, hours: req.hours}

  dayTimeObj = (i, body) ->
    hourKey = 'hour_'+i
    daysKey = 'days_'+i
    console.log hourKey + ":  "+ typeof body[hourKey]
    if body[hourKey] isnt 'undefined'
      return
    hours.push {hour: body[hourKey], days: body[daysKey]}
    return





  SettingsRouter