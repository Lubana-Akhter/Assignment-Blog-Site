const bcrypt = require("bcrypt");

// Function to hash a password
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt with 12 rounds of hashing
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      // Hash the password using the generated salt
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        // Resolve the hashed password
        resolve(hash);
      });
    });
  });
};

// Function to compare a password with a hashed password
exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
