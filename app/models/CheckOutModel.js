var mongoose = require("mongoose");
const checkoutSchema = mongoose.Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    addressLine1: { type: String, required: true, },
    addressLine2: { type: String, required: true, },
    city: { type: String, required: true, },
    postcode: { type: String, required: true, },
    contry: { type: String, required: true, },
})
module.exports = mongoose.model("Orders", checkoutSchema)

