const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./src/models");
const initRoutes = require("./src/routes/web");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

dotenv.config();
const app = express();

const whitelist = ['https://reyaly-books.herokuapp.com', 'http:localhost:3000']

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));


global.__basedir = __dirname;

app.use(cookieParser());
app.use(express.json());
app.use(router);

initRoutes(app);
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
let PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Running  on port ${PORT}`);
}); 