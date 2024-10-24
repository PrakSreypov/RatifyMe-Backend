const insertData = require("../utils/insertData");
const ServicePlans = require("../models/ServicePlans");

const servicePlansData = [
    {
        name: "Free Starter",
        description: "A free plan with limited access to badge platform features.",
        duration: 1,
        price: 0.0,
        badgeLimit: 5,
        peopleLimit: 10,
        isBadgeVerificationAvailable: false,
        isBadgeBackpackFress: false,
        isBadgeReportsAvailable: false,
        isBadgeCertificatesAvailable: false,
        isTechnicalSupportType: false,
        stripeProductId: "prod_R1oU11lGfn4zIE",
        stripePriceId: "price_1Q9krpEF0UjOYuRsnnVwRAjj",
    },
    {
        name: "Pro Plan",
        description: "A plan for professionals and small teams with more badges and basic support.",
        duration: 3,
        price: 199.99,
        badgeLimit: 50,
        peopleLimit: 100,
        isBadgeVerificationAvailable: true,
        isBadgeBackpackFress: true,
        isBadgeReportsAvailable: true,
        isBadgeCertificatesAvailable: true,
        isTechnicalSupportType: true,
        stripeProductId: "prod_R1oXygJvZa4st0",
        stripePriceId: "price_1Q9ku9EF0UjOYuRsRrQT3g2r",
    },
    {
        name: "Enterprise Plan",
        description: "An all-inclusive plan for enterprises with maximum badges, people, and premium support.",
        duration: 12,
        price: 399.99,
        badgeLimit: 500,
        peopleLimit: 5000,
        isBadgeVerificationAvailable: true,
        isBadgeBackpackFress: true,
        isBadgeReportsAvailable: true,
        isBadgeCertificatesAvailable: true,
        isTechnicalSupportType: true,
        stripeProductId: "prod_R5ahGwVPRH4y9i",
        stripePriceId: "price_1QDPWNEF0UjOYuRsgbThAOfE",
    },
];

insertData(ServicePlans, servicePlansData, { validate: false });
