exports.userData = (user) => ({
  userId: user._id,
  email: user.email,
  fullName: user.fullName,
  phone: user.phone,
  emailVerified: user.emailVerified,
  animals: user.animals,
});

exports.businessData = (business) => ({
  businessId: business._id,
  name: business.name,
  image: business.image,
  coordinates: business.coordinates || null,
  comments: business.comments || [],
  information: business.information,
  workingTime: business.workingTime || [],
  services: business.services || [],
});
