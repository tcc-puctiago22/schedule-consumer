require("dotenv").config({ path: '././.env' })
const express = require("express");
const actuator = require('express-actuator');
const options = {
        basePath: '/management', // It will set /management/info instead of /info
        infoGitMode: 'simple', // the amount of git information you want to expose, 'simple' or 'full',
        infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
        infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
        customEndpoints: [] // array of custom endpoints
};

actuator(options);

const app = express();

app.use(actuator());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

console.log(db.url)
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    require('./kafka/consumer')

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome API Schedule." });
});

require("./routes/v1/routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 3100;

app.listen(PORT, () => {
  console.log(`API Schedule listening on port ${PORT}`)
})

