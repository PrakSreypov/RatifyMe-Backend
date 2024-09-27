const AcademicBackgrounds = require("../models/AcademicBackgrounds");
const insertData = require("./insertData");

const AcademicBackgroundsData = [
    {
        institutionId: 11,
        academicYear: new Date("2020-01-01"),
    },
    {
        institutionId: 11,
        academicYear: new Date("2021-06-01"),
    },
    {
        institutionId: 11,
        academicYear: new Date("2019-09-01"),
    },
    {
        institutionId: 11,
        academicYear: new Date("2018-05-01"),
    },
    {
        institutionId: 11,
        academicYear: new Date("2022-01-01"),
    },
];

insertData(AcademicBackgrounds, AcademicBackgroundsData, { validate: true, returning: false });
