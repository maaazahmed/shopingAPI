
var mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    imageUrl: { type: String, required: true,},
    name: { type: String, required: true, },
    price: { type: Number, required: true,},
    category: { type: Array, required: true,},
    size: { type: Array, required: true,}
})
module.exports = mongoose.model("products", productSchema)



