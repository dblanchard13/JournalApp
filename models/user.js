// Loading bcrypt to hash our passwords
var bcrypt = require('bcrypt-nodejs');

// Our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    // Username cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    {
      // Method to check if unhashed password entered
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      },
      // Hooks are automatic methods that run during stages of the User Model
      // Before a user is created, we will automatically hash their password
      hooks: {
        beforeCreate: function(user, options, callback) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          callback(null, options);
        }
      }
    }
  });
  return User;
};