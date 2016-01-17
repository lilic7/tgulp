module.exports = function(app, express) {
  var emisiuniRouter, programRouter;
  programRouter = express.Router();
  programRouter.get('/', function(req, res) {
    return res.render("pages/program_layout");
  });
  emisiuniRouter = express.Router();
  emisiuniRouter.get('/', function(req, res) {
    return res.render("pages/program_layout");
  });
  emisiuniRouter.get('/add', function(req, res) {
    return res.send('Adauga o noua emisiune');
  });
  programRouter.use('/emisiuni', emisiuniRouter);
  return programRouter;
};
