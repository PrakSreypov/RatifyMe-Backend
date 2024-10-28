const Criterias = require("../models/Criterias");
const insertData = require("../utils/insertData");

const criteriasData = [
    {
        narrative: "Complete 10 hours of community service.",
        badgeClassId: 1,
    },
    {
        narrative: "Participate in 5 group projects.",
        badgeClassId: 2,
    },
    {
        narrative: "Submit 3 research papers.",
        badgeClassId: 3,
    },
    {
        narrative: "Attend 8 workshops.",
        badgeClassId: 4,
    },
    {
        narrative: "Lead a team in a project.",
        badgeClassId: 6,
    },
    {
        narrative: "Create a tutorial for a new software.",
        badgeClassId: 7,
    },
    {
        narrative: "Participate in a hackathon.",
        badgeClassId: 8,
    },
    {
        narrative: "Complete an online certification course.",
        badgeClassId: 9,
    },
    {
        narrative: "Mentor a junior member.",
        badgeClassId: 10,
    },
];

insertData(Criterias, criteriasData, { validate: true, returning: false });
