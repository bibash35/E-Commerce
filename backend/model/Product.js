const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    inStock: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: String,
    category: String,
    price: Number,
    image: String, // Only the Cloudinary image URL
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
