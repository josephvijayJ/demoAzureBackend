const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const passwordHash = asyncHandler(async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log('password hash');
    console.log(bcrypt.hash(password, salt));
    return await bcrypt.hash(password, salt);
  } catch (error) {
    res.status(401);
    throw new Error('error in password hash');
  }
});

module.exports = passwordHash;
