exports.userData = (user) => ({
  userId: user._id,
  email: user.email,
  fullName: user.fullName,
  phone: user.phone,
  emailVerified: user.emailVerified,
  dogs: user.dogs,
  followers: user.followers,
  following: user.following,
  imageData: user.imageData,
  imageName: user.imageName,
});

exports.businessData = (business) => ({
  businessId: business._id,
  name: business.name,
  imageData: business.imageData,
  callout: business.callout,
  type: business.type,
  dogWalkingInfo: business.dogWalkingInfo,
  skills: business.skills,
  warnings: business.warnings,
  coordinates: business.coordinates || null,
  comments: business.comments || [],
  information: business.information,
  workingHours: business.workingHours || [],
  acceptedSize: business.acceptedSize,
  services: business.services || [],
});

exports.businessLessData = (business) => ({
  businessId: business._id,
  name: business.name,
  coordinates: business.coordinates || null,
  comments: business.comments || [],
});

exports.postData = (post) => ({
  postId: post._id,
  content: post.content,
  imageData: post.imageData,
  likes: post.likes,
  comments: post.comments,
  userId: post.userId,
  createdAt: post.createdAt,
});
