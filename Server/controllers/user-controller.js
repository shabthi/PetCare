const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// User signup
exports.userSignup = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            fullName: req.body.fullName,
                            address: req.body.address,
                            nic: req.body.nic,
                            email: req.body.email,
                            telephone: req.body.telephone,
                            password: hash,
                            profilePicture: ""
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log("sjkdgasfas");
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        });
}

// User login
exports.userLogin = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                });

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

// Get user profile
exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req.userId },
        (err, user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'Cannot get profile details'
                });
            } else {
                return res.status(200).json({
                    user: user
                });
            }
        });
}

// User profile update
exports.userUpdate = (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: req.userId }, { $set: updateOps }).exec()
        .then(result => {
            console.log(result);
            if (result.ok == 1) {
                res.status(200).json({
                    message: 'Profile updated'
                });
            } else {
                res.status(500).json({
                    message: 'Profile does not updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

// Update profile picture
exports.updateProfilePicture = (req, res, next) => {
    User.findOne({ _id: req.userId }).select('profilePicture').exec().then(doc => {
        console.log(doc.profilePicture);
    });
    const newPicture = {"profilePicture": req.file.path};
    User.update({ _id: req.userId }, { $set: newPicture }).exec()
        .then(result => {
            if (result.ok == 1) {
                res.status(200).json({
                    message: 'Profile picture updated'
                });
            } else {
                res.status(500).json({
                    message: 'Profile picture does not updated!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}