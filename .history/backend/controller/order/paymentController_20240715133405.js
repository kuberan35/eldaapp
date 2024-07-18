const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');
const orderModel = require('../../models/orderModel');

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const user = await userModel.findOne({ _id: req.userId });

        // Save order details in the database
        const newOrder = new orderModel({
            userId: req.userId,
            cartItems,
        });
        const savedOrder = await newOrder.save();

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card', 'googlepay', 'phonepe', 'paytm', 'applepay'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PV7BcG90KKrbYi2Lk5FAKRm'
                }
            ],
            customer_email: user.email,
            line_items: cartItems.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage,
                        metadata: { productId: item.productId._id }
                    },
                    unit_amount: item.productId.sellingPrice
                },
                adjustable_quantity: { enabled: true, minimum: 1 },
                quantity: item.quantity,
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json(session);
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
