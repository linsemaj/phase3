var mongoose = require("mongoose");
var ProductSchema = mongoose.Schema;

var ProductSchemaRef = new ProductSchema({
    name: String,
    image: String,
    price: Number,
});

var ProductModel = mongoose.model("Product", ProductSchemaRef);
module.exports = ProductModel;