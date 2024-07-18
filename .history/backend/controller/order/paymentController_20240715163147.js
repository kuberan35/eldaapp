const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');
const orderModel = require('../../models/orderModel');

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const currentUser = user
        const user = await userModel.findOne({ _id: req.user });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card', 'ideal'], // Example: Only include valid types
            billing_address_collection: 'auto',
            customer_email: user.email, // Ensure user object exists before accessing properties
            line_items: cartItems.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productId.productName,
                        images: item.productId.productImage,
                        metadata: { productId: item.productId._id }
                    },
                    unit_amount: item.productId.sellingPrice * 100 // Convert to the smallest currency unit
                },
                adjustable_quantity: { enabled: true, minimum: 1 },
                quantity: item.quantity,
            })),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json({ id: session.id });
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
