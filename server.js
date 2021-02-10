const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

//require files
const db = require("./config/keys").mongoURI;
const posts = require("./routes/posts");
const profile = require("./routes/profile");
const users = require("./routes/users");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routes
app.use("/users", users);
app.use("/profile", profile);
app.use("/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
