const Product = require("../model/Product");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.storeProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const imageFile = req.files?.image?.[0]?.path;

    if (!imageFile) return res.status(400).json({ message: "Image is required" });

    const cloudUpload = await uploadOnCloudinary(imageFile);
    if (!cloudUpload) return res.status(500).json({ message: "Image upload failed" });

    const product = await Product.create({
      name,
      category,
      price,
      description,
      image: cloudUpload.secure_url,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Store product error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, category, price, description } = req.body;

    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files?.image?.[0]?.path) {
      const cloudUpload = await uploadOnCloudinary(req.files.image[0].path);
      if (cloudUpload) {
        product.image = cloudUpload.secure_url;
      }
    }

    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.description = description ?? product.description;

    await product.save();

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findByIdAndDelete(_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Note: image not deleted from Cloudinary (no public_id saved)
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
