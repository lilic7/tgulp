module.exports = function(app, express) {
  var stiriRouter;
  stiriRouter = express.Router();
  stiriRouter.get('/', function(req, res) {
    res.send("Vezi promterul pentru ultimul buletin de stiri");
  });
  return stiriRouter;
};
