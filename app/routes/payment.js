var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")
var Payment = require("../models/PaymentModel")


// ====>>>  Save Payment
// ====>>>  URL :  http://localhost:8000/payment
router.post("/savepayment", (req, res) => {
    console.log(req.body)
    const payment = new Payment({
        creditCardNumber: req.body.creditCardNumber,
        expire: req.body.expire,
        CVVCode: req.body.CVVCode,
    })
    payment.save((error, success) => {
        if (error) {
            res.send({
                message: "Something went wrong !",
                error
            })
        }
        else {
            res.send({
                message: "Payment successful !",
                success
            })
        }
    })
})


// ====>>>  Getting payment
// ====>>>  URL :  http://localhost:8000/payment/getPayment
router.get("/getPayment", (req, res) => {
    Payment.find().exec().then((data) => {
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

// ====>>>  Updating Payment
// ====>>>  URL :  http://localhost:8000/payment/updatePayment
router.put("/updatePayment", (req, res) => {
    Payment.updateOne({ _id: req.body._id }, req.body, (error, success) => {
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
// ====>>>  URL :  http://localhost:8000/payment/delete Order
    router.delete("/deletePayment", (req, res) => {
        Payment.deleteOne({ _id: req.body._id }, (error, success) => {
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


const paymentrout = router
module.exports = paymentrout