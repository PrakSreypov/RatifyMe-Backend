const Earners = require("../models/Earners");
const insertData = require("./insertData");

const EarnersData = [
    {
        userId: 8,
        achievementId: 7,
    },
    {
        userId: 12,
        achievementId: 9,
    },
];

insertData(Earners, EarnersData, { validate: true, returning: false });
