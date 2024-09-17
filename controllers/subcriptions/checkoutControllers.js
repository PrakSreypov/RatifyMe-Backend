require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const ServicePlans = require("../../models/ServicePlans");
const Subscriptions = require("../../models/Subscriptions");

const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

// POST request to create Stripe Checkout session
exports.createCheckoutSession = catchAsync(async (req, res, next) => {
    const { servicePlanId } = req.params;

    // Fetch the service plan from the database
    const servicePlan = await ServicePlans.findByPk(servicePlanId);
    if (!servicePlan) {
        return next(new AppError("Service Plan not found", 404));
    }
    console.log("Service Plan:", servicePlan);

    const { stripePriceId } = servicePlan;
    if (!stripePriceId) {
        return next(new AppError("Price ID not found for the service plan", 400));
    }
    console.log("Stripe Price ID:", stripePriceId);

    // Create a new subscription record with a pending status
    const subscription = await Subscriptions.create({
        institutionId: 4 || null,
        servicePlanId,
        startDate: new Date(),
        status: false,
    });
    console.log("Subscription created:", subscription);
    try {
        // Create the Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: stripePriceId, quantity: 1 }],
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/`,
            metadata: {
                subscriptionId: subscription.id,
                servicePlanId,
            },
        });
        console.log("Session created:", session.id);

        // Respond with the session ID
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error("Stripe error:", error);
        return next(new AppError("Failed to create Stripe session", 500));
    }
});

exports.getCancel = async (req, res) => {
    res.redirect("/");
};

exports.getSuccess = async (req, res) => {
    res.status(200).send("You've successfully subscribed to our plan");
};
