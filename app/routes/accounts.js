var express = require("express")
var account = express.Router()
var mongoose = require("mongoose")
var bcrypt = require("bcrypt");
var User = require("../models/userModel")




// ====>>>  Sign Up Route 
// ====>>>  URL http://localhost:8000/account/signup
account.post("/signup", (req, res) => {
    console.log(req.body)
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        })
                        user.save().then((success) => {
                            res.status(201).json({
                                message: "User Created"
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                error: "err"
                            })
                        })
                    }
                })
            }
        })
})


// ====>>>  Sign In Route
// ====>>>  URL http://localhost:8000/account/signin
account.post("/signin", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.status(401).json({
                    message: "Invalid email or password !"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                if (err) {
                    await res.status(401).json({
                        userId: "Auth field"
                    })
                }
                else if (result) {
                    await res.status(200).json({
                        message: "Login Successful",
                        user: user[0]
                    })
                }
                else {
                    await res.status(401).json({
                        userId: "Invalid email or password !"
                    })
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

// ====>>>  Update Route
// ====>>>  URL http://localhost:8000/account/updateUser
account.put("/updateUser", (req, res) => {
    User.updateOne({ _id: req.body._id }, req.body, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error
            })
        }
        else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})
// ====>>>  Delete Route
// ====>>>  URL http://localhost:8000/account/deleteUser
account.delete("/deleteUser", (req, res) => {
    User.deleteOne({ _id: req.body._id }, (error, success) => {
        if (error) {
            res.send({
                message: "Delete fail !",
                error
            })
        }
        else {
            res.send({
                message: "Successfuly deleted !",
                success
            })

        }
    })
})
module.exports = account




