const Product = require("../models/productSchema");
const Cart = require("../models/cartSchema");

// create cart
const createCart = async (req, res) => {
    try {
        let { productId, quantity = 1, owner } = req.body;

        if (!productId || !owner) {
            return res.status(400).json({
                success: false,
                message: "Product ID and owner required"
            });
        }

        let existingProduct = await Product.findOne({ _id: productId });
        let existingCart = await Cart.findOne({ productId: productId, owner });

        if (existingCart) {
            let total = existingCart.quantity + 1;

            if (total > existingProduct.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Request quantity unavailable in stock"
                });
            }

            existingCart.quantity = existingCart.quantity + 1;
            await existingCart.save();
            return res.status(201).json({
                success: true,
                message: "cart  quantity updated successfully",
                data: existingCart
            });
        }

        if (existingProduct.stock >= quantity)

            let cart = await new Cart({
                productId,
                quantity,
                owner
            }).save();

            return res.status(201).json({
                success: true,
                message: "Product add to cart successfully",
                data: cart
            });
        } else {

            return res.status(400).json({
                success: false,
                message: "Product is out of stock"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add product cart",
            error: error.message
        });
    }
};


const increDecre = async (req, res) => {
    try {
        let { cartId, quantity, owner, type } = req.body;

        let existingCart = await Cart.findOne({ _id: cartId, owner }).populate("productId");

        if (!existingCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        if (type == "plus") {
            let total = existingCart.quantity + quantity;

            if (total > existingCart.productId.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity not available stock"
                });
            } else {
                existingCart.quantity = existingCart.quantity + quantity;
            }

            existingCart.quantity = existingCart.quantity + 1;
        } else {
            if (existingCart.quantity > 1) {
                existingCart.quantity = existingCart.quantity - 1;
            } else {
               
                await Cart.findByIdAndDelete(cartId);

                return res.status(200).json({
                    success: true,
                    message: "item remove from cart"
                });
            }
        }

        await existingCart.save();

        return res.status(200).json({
            success: true,
            message: "Cart update successfully",
            data: existingCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update cart ",
            error: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        let { owner } = req.params;

        let carts = await Cart.find({ owner }).populate("productId");

        console.log(carts);

        return res.status(200).json({
            success: true,
            message: "Cart fetch successfully",
            data: carts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to fetch cart item",
            error: error.message
        });
    }
};
module.exports = { createCart, increDecre ,getCart  };
