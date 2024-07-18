const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY');

const createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;

        const lineItems = items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.productName,
                },
                unit_amount: item.sellingPrice * 100, // Stripe amount is in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'upi', 'netbanking'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = createCheckoutSession
