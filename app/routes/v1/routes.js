module.exports = app => {
  var router = require("express").Router();

  console.log(`routes`)
  
  app.get('/health', (req, res) => {
    res.send('ok')
  })
  app.use("/schedule/v1/", router);
};
