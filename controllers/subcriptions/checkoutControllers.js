require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.createSession = catchAsync(async (req, res, next) => {
    const { institutionId, servicePlanId, startDate, endDate } = req.body;

    // Create a new Checkout Session for a subscription
    const priceId = getPriceId(servicePlanId); // Define this function to map servicePlanId to Stripe priceId

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    // Save subscription details in the database
    const subscription = await Subscriptions.create({
        institutionId,
        servicePlanId,
        status: false, // Set initial status, might be updated later
        startDate,
        endDate,
        stripeSubscriptionId: session.id, // Use session ID or subscription ID as needed
    });

    res.json({ sessionId: session.id });
});
