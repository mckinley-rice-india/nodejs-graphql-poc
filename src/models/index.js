const { connect } = require("mongoose");

connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log("MONGODB connected successfully"))
  .catch((e) => console.log("MONGODB connection failed", e));

module.exports = {
  User: require("./user"),
  Post: require("./post"),
  Comment: require("./comment"),
};
