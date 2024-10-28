const BadgeCriteriaItems = require("../models/BadgeCriteriaItems");
const insertData = require("../data/insertData");

const badgeCriteriaItemsData = [
    {
        criteriasId: 1,
        achievementsId: 10,
    },
    {
        criteriasId: 2,
        achievementsId: 9,
    },
    {
        criteriasId: 3,
        achievementsId: 8,
    },
    {
        criteriasId: 4,
        achievementsId: 7,
    },
    {
        criteriasId: 6,
        achievementsId: 6,
    },
    {
        criteriasId: 7,
        achievementsId: 4,
    },
    {
        criteriasId: 8,
        achievementsId: 3,
    },
    {
        criteriasId: 9,
        achievementsId: 2,
    },
    {
        criteriasId: 10,
        achievementsId: 1,
    },
];

insertData(BadgeCriteriaItems, badgeCriteriaItemsData, { validate: true, returning: false });
