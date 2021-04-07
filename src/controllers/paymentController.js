// @ts-nocheck
const stripe =  require("stripe")(process.env.STRIPE_SECRET);

exports.postCheckout = async (req, res) => {
    try {
        const {amount, receipt_email} = req.body
        // Create payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            receipt_email, 
            description: "Created by stripe.com/docs demo",
        })
        res.status(200).send(paymentIntent.client_secret);

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}