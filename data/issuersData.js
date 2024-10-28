const Issuers = require("../models/Issuers");
const insertData = require("../utils/insertData");

const issuersData = [
    {
        userId: 4,
        institutionId: 7,
        endorsementId: 501,
    },
    {
        userId: 5,
        institutionId: 9,
        endorsementId: 502,
    },
    {
        userId: 9,
        institutionId: 10,
        endorsementId: 503,
    },
    {
        userId: 13,
        institutionId: 11,
        endorsementId: 504,
    },
    {
        userId: 17,
        institutionId: 13,
        endorsementId: 506,
    },
    {
        userId: 18,
        institutionId: 16,
        endorsementId: 507,
    },
    {
        userId: 21,
        institutionId: 16,
        endorsementId: 508,
    },
    {
        userId: 23,
        institutionId: 15,
        endorsementId: 509,
    },
    {
        userId: 25,
        institutionId: 16,
        endorsementId: 510,
    },
];

insertData(Issuers, issuersData, { validate: true, returning: false });
