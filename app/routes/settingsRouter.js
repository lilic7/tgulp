var EmissionDefault, EmissionType;

EmissionType = require('../models/Settings/emissionType');

EmissionDefault = require('../models/Settings/emissionDefault');

module.exports = function(app, express) {
  var SettingsRouter, dayTimeObj;
  SettingsRouter = express.Router();
  SettingsRouter.get("/", function(req, res) {
    return res.render('pages/settings');
  });
  SettingsRouter.get("/json/types", function(req, res) {
    return EmissionType.find(function(err, types) {
      if (err) {
        res.json({
          message: "Unable to load types",
          error: err
        });
      }
      return res.json(types);
    });
  });
  SettingsRouter.get("/json/defaults", function(req, res) {
    return EmissionDefault.find().sort({
      'defaultName': 1
    }).exec(function(err, defaults) {
      if (err) {
        res.json({
          message: "Unable to load defaults",
          error: err
        });
      }
      return res.json(defaults);
    });
  });
  SettingsRouter.get("/json/defaults/edit/:id", function(req, res) {
    return EmissionDefault.find({
      "_id": req.params.id
    }).exec(function(err, emission) {
      if (err) {
        res.json({
          message: "Unable to load emission",
          error: err
        });
      }
      return res.json(emission);
    });
  });
  SettingsRouter.get("/emisiuni/types", function(req, res) {
    return res.render("pages/settings/types");
  });
  SettingsRouter.use(function(req, res, next) {
    if (req.body.tname === "") {
      res.redirect('back');
    } else {
      next();
    }
  });
  SettingsRouter.post("/emisiuni/types", function(req, res) {
    var type;
    type = new Object();
    type.name = req.body.tname;
    return EmissionType.update({
      name: type.name
    }, type, {
      upsert: true
    }, function(err) {
      if (err) {
        res.send(err);
      }
      return res.json({
        "message": "Gen nou creat"
      });
    });
  });
  SettingsRouter.get("/emisiuni/defaults", function(req, res) {
    return res.render('pages/settings/defaults');
  });
  SettingsRouter.use(function(req, res, next) {
    if (req.body.defName === "" || typeof req.body.defName === "undefined") {
      res.redirect('back');
    } else {
      req.hours = dayTimeObj(req.body);
      next();
    }
  });
  SettingsRouter.post("/emisiuni/defaults/add", function(req, res) {
    var emDefault;
    emDefault = new Object();
    emDefault.defaultName = req.body.defName;
    emDefault.defaultType = req.body.defType;
    emDefault.defaultLength = req.body.defLength;
    emDefault.defaultTime = req.hours;
    EmissionDefault.update({
      defaultName: emDefault.defaultName
    }, emDefault, {
      upsert: true
    }, function(err) {
      if (err) {
        res.send(err);
      }
      res.redirect('/settings/emisiuni/defaults');
    });
    emDefault = {};
  });
  dayTimeObj = function(body) {
    var daysKey, hourKey, hours, i, j, len, ref;
    hours = new Array();
    ref = [1, 2, 3, 4, 5, 6, 7];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      hourKey = 'hour_' + i;
      daysKey = 'days_' + i;
      if (typeof body[hourKey] !== "undefined" && body[hourKey] !== "") {
        hours.push({
          hour: body[hourKey],
          days: body[daysKey]
        });
      } else {
        break;
      }
    }
    return hours;
  };
  return SettingsRouter;
};
