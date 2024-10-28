const Achievements = require("../models/Achievements");
const insertData = require("../utils/insertData");

const achievementsData = [
    {
        badgeClassId: 1,
        achievementTypeId: 1,
        status: "ToDo",
    },
    {
        badgeClassId: 2,
        achievementTypeId: 2,
        status: "Doing",
    },
    {
        badgeClassId: 3,
        achievementTypeId: 3,
        status: "Done",
    },
    {
        badgeClassId: 4,
        achievementTypeId: 4,
        status: "ToDo",
    },
    {
        badgeClassId: 6,
        achievementTypeId: 6,
        status: "Done",
    },
    {
        badgeClassId: 7,
        achievementTypeId: 7,
        status: "ToDo",
    },
    {
        badgeClassId: 8,
        achievementTypeId: 8,
        status: "Doing",
    },
    {
        badgeClassId: 9,
        achievementTypeId: 9,
        status: "Done",
    },
    {
        badgeClassId: 10,
        achievementTypeId: 10,
        status: "ToDo",
    },
];

insertData(Achievements, achievementsData, { validate: true, returning: false });
