EmissionType = require '../models/Settings/emissionType'
EmissionDefault = require '../models/Settings/emissionDefault'

module.exports = (app, express) ->
  SettingsRouter = express.Router()

  SettingsRouter.get "/", (req, res) ->
    res.render 'pages/settings'

# --Emisiuni--

# Genuri de emisiuni
# GET genurile de emisiuni. return JSON
  SettingsRouter.get "/emisiuni/types", (req, res) ->
    EmissionType.find (err, types) ->
      res.send err if err
      res.json types

# MIDDLEWARE: Verificare gen
  SettingsRouter.use (req, res, next) ->
    if req.body.tname is ""
      res.redirect('back')
    else
      next()
    return

# POST Adauga un nou gen
  SettingsRouter.post "/emisiuni/types", (req, res) ->
    type = new Object()
    type.name = req.body.tname
    EmissionType.update {name: type.name}, type, {upsert: true}, (err) ->
      res.send err if err
      res.json {"message": "Gen nou creat"}


# Modele de emisiuni
# LAYOUT pentru modele
  SettingsRouter.get "/emisiuni/defaults", (req, res) ->
    res.render 'pages/default-emission-add'


# GET modelele de emisiuni. return JSON
  SettingsRouter.get "/emisiuni/defaults/view", (req, res) ->
    EmissionDefault.find()
      .sort {'defaultName': 1}
      .exec (err, defaults) ->
          res.send err if err
          res.json defaults


# MIDDLEWARE: Verificarea datelor
  SettingsRouter.use (req, res, next) ->
    if req.body.defName is "" or typeof req.body.defName is "undefined"
      res.redirect('back')
    else
      req.hours = dayTimeObj(req.body);
      next()
    return


# POST: Salvarea modelului de emisiune in DB
  SettingsRouter.post "/emisiuni/defaults/add", (req, res) ->
    emDefault = new Object()
    emDefault.defaultName = req.body.defName
    emDefault.defaultType = req.body.defType
    emDefault.defaultLength = req.body.defLength
    emDefault.defaultTime = req.hours
    EmissionDefault.update {defaultName: emDefault.defaultName}, emDefault,{upsert: true}, (err) ->
      res.send err if err
      res.redirect('/settings/emisiuni/defaults')
      return
    emDefault = {}
    return

# --END Emisiuni--

# --Functii--

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

# --END Functii--

  SettingsRouter