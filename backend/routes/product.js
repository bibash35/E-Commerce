const express = require("express");
const {
  storeProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

const { upload } = require("../middelware/multer.middleware");
const { checkAuthentication, isSeller } = require("../middelware/ticket");

const router = express.Router();

router.get("/", fetchProducts);

router.post(
  "/",
  checkAuthentication,
  isSeller,
  upload.fields([{ name: "image", maxCount: 1 }]),
  storeProduct
);

router.put(
  "/:_id",
  checkAuthentication,
  isSeller,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProduct
);

router.delete("/:_id", checkAuthentication, isSeller, deleteProduct);

module.exports = router;
