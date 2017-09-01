import User from '../models/user'

exports.me = function(req, res, next) {
  // Return authenticated user, sans password
  let currentUser = req.user;
  res.json(currentUser);
}

exports.update = function(req, res, next) {
  let user = req.body.user;
  console.log(user);
  User.findByIdAndUpdate(req.user._id, {$set: {mobileNo: user.mobileNo, dispName: user.dispName}}, {new: true}, (err, user) => {
  	console.log(user);
  	res.json({result: 'success'});
  })
}
