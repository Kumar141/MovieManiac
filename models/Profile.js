const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  favGenres: [
    {
      type: String,
    },
  ],
  favMoviesAndSeries: [
    {
      type: String,
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
