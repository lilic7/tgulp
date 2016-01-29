EmissionType = require '../models/Settings/emissionType'
EmissionDefault = require '../models/Settings/emissionDefault'

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

  SettingsRouter.get "/emisiuni/defaults/view", (req, res) ->
    EmissionDefault.find (err, defaults) ->
      res.send err if err
      res.json defaults

  SettingsRouter.use (req, res, next) ->
    req.hours = dayTimeObj(req.body);
    next()
    return

  SettingsRouter.post "/emisiuni/defaults/add", (req, res) ->
    emDefault = new Object()
    emDefault.defaultName = req.body.defName
    emDefault.defaultType = req.body.defType
    emDefault.defaultLength = req.body.defLength
    emDefault.defaultTime = req.hours
    EmissionDefault.update {defaultName: emDefault.defaultName}, emDefault,{upsert: true}, (err) ->
      res.send err if err
      res.redirect('/settings/emisiuni/defaults')
    #res.json {body: req.body, hours: req.hours}

  dayTimeObj = (body) ->
    hours = new Array()
    for i in [1, 2, 3, 4, 5, 6, 7]
      hourKey = 'hour_'+i
      daysKey = 'days_'+i
      if typeof body[hourKey] isnt "undefined" and body[hourKey] isnt ""
        hours.push {hour: body[hourKey], days: body[daysKey]}
      else
        break
    hours

  SettingsRouter