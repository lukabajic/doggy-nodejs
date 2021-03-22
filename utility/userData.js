module.exports = (user) => ({
  userId: user._id,
  email: user.email,
  fullName: user.fullName,
  phone: user.phone,
  emailVerified: user.emailVerified,
  animals: user.animals,
});
