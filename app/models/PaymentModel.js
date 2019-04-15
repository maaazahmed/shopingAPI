var mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    creditCardNumber: { type: Number, required: true },
    expire: { type: String, required: true },
    CVVCode: { type: Number, required: true },
})
module.exports = mongoose.model("Payment", paymentSchema)

