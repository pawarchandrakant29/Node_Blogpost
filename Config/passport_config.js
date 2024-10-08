const passportConfring = require("passport");
const LocalStrategy = require("passport-local");
const authModule = require("../Modules/Authontication");
const bcrypt = require("bcrypt");

passportConfring.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      // Use email instead of username to find the user
      let user = await authModule.findOne({ email: email });

      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            done(err);
          }

          if (result) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    }
  )
);

passportConfring.serializeUser((user, done) => {
  done(null, user._id);
});

passportConfring.deserializeUser(async (id, done) => {
  let user = await authModule.findById(id);
  if (user) {
    done(null, user);
  }
});

module.exports = passportConfring;
