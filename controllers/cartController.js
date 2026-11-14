let Product = require("../models/productSchema");
let Cart = require("../models/cartSchema");

// create cart
const createCart = async (req, res) => {
    try {
        let { productId, quantity = 1, owner } = req.body;

        if (!productId || !owner) {
            return res.status(400).json({
                success: false,
                message: "Product ID and owner are required"
            });
        }

        let existingProduct = await Product.findOne({ _id: productId });
        let existingCart = await Cart.findOne({ productId: productId, owner });

        if (existingCart) {
            let total = existingCart.quantity + 1;

            if (total > existingProduct.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity exceeds available stock"
                });
            }

            existingCart.quantity = existingCart.quantity + 1;
            await existingCart.save();
            return res.status(201).json({
                success: true,
                message: "Cart item quantity updated successfully",
                data: existingCart
            });
        }

        if (existingProduct.stock >= quantity) {
            console.log("Product available");

            let cart = await new Cart({
                productId,
                quantity,
                owner
            }).save();

            return res.status(201).json({
                success: true,
                message: "Product added to cart successfully",
                data: cart
            });
        } else {
            console.log("Product not available");

            return res.status(400).json({
                success: false,
                message: "Product is currently out of stock"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add product to cart",
            error: error.message
        });
    }
};




module.exports = { createCart,  };