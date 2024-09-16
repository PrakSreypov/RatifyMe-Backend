const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.webhook = catchAsync(async (req, res, next) => {

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        // Construct the event using the raw body
        event = stripe.webhooks.constructEvent(
            // Use req.body directly, which will be a Buffer due to express.raw()
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET_KEY,
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on its type
    const session = event.data.object; // Access the session object

    switch (event.type) {
        case "checkout.session.completed":
            console.log("Checkout session completed:", session);
            // Handle the successful checkout session here
            break;

        // Add other cases as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
            return next(new AppError(`Unhandled event type ${event.type}`));
    }

    // Acknowledge receipt of the event
    res.status(200).send("Received");
});
