var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")
var Product = require("../models/ProductModel")

router.post("/createProducts", (req, res) => {
    const product = new Product({
        imageUrl:req.body.imageUrl,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        size: req.body.size
    });
    
    // Save products in the database
    product.save().then(data => {
        res.send(data);
    })
    .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});



// ====>>>  Getting Products 
// ====>>>  URL :  http://localhost:8000/product/getProducts?category=Shorts (Shoes, Drasses, etc) 
// router.get("/getProducts", (req, res) => {
//     Product.find().then((data) => {
//         res.send(data)
//     }).catch((error) => {
//         res.send(error)
//     })
// })
///
//Get Products through Category
// ====>>>URL :  http://localhost:8000/product/getProduct?category=Shorts
router.get("/getProduct", (req, res) => {
    // Product.find({ category: req.query.category }).exec().then((data) => {
        Product.find({category:{$in:[req.query.fashion]}}).exec().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
})



// ====>>>  Update Products 
// ====>>>  URL :  http://localhost:8000/product/updateProduct
router.put("/updateProduct", (req, res) => {
    Product.updateOne({ _id: req.body._id }, req.body, (error, success) => {
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


// ====>>>  Delete Products 
// ====>>>  URL :  http://localhost:8000/product/deleteProduct
router.delete("/deleteProduct", (req, res) => {
    Product.deleteOne({ _id: req.body._id }, (error, success) => {
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


const product = router;
module.exports = product