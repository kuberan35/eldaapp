const stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async(req, res) => {
    try{
        const { cartItems } = req.body

        console.log("cartItems",cartItems );

        const user = await userModel.findOne({ _id : req.user});

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card' , 'googlepay', 'phonepe', 'paytm', 'applepay'],
            billing_address_colection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1PV7BcG90KKrbYi2Lk5FAKRm'
                }
            ],
            customer_email : user.email,
            line_items : cartItems.map((item,index) => {
                return{
                    price_data : {
                        currency : 'inr',
                        product_data : {
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id
                            }
                        },
                        unit_amount : item.productId.sellingPrice
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity,
                }
            }),

            success_url : `${process.env.FONTEND_URL}/success`,
            cancel_url : `${process.env.FONTEND_URL}/cancel`,

        }
        const session = await stripe.checkout.sessions.create(params)

        res.status(303).json(session)

    }catch (error) {
        res.json({
        message : error?.message || error,
        error : true,
        success : false

        })
    }
};

module.exports = paymentController