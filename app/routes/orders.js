var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")
var CheckOut = require("../models/CheckOutModel")




// ====>>>  Checkout
// ====>>>  URL :  http://localhost:8000/order/addOrder
router.post("/addOrder", (req, res) => {
    const checkOut = new CheckOut({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        postcode: req.body.postcode,
        contry: req.body.contry,
    })
    checkOut.save((error, success) => {
        if (!error) {
            res.send({
                message: "Order successfuly submited !",
                data: checkOut
            })
        }
        else {
            res.send({
                message: "chekout failed !",
                data: error
            })
        }
    })
})



// ====>>>  Getting Checkouts
// ====>>>  URL :  http://localhost:8000/order/getOrder
router.get("/getOrder", (req, res) => {
    CheckOut.find().exec().then((data) => {
        res.send({
            checkouts: data
        })
    }).catch((err) => {
        res.send({
            message: "Something went to wrong !",
            err
        })
    })
})
// ====>>>  Updating Checkouts
// ====>>>  URL :  http://localhost:8000/order/updateOrder
router.put("/updateOrder", (req, res) => {
    CheckOut.updateOne({ _id: req.body._id }, req.body, (error, success) => {
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
// ====>>>  Deleting Checkouts
// ====>>>  URL :  http://localhost:8000/order/delete Order
router.delete("/deleteOrder", (req, res) => {
    CheckOut.deleteOne({ _id: req.body._id }, (error, success) => {
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

const order = router
module.exports = order

