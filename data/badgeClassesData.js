const BadgeClasses = require("../models/BadgeClasses");
const insertData = require("../data/insertData");

// Function to generate a random future date
const getRandomFutureDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return new Date(
        startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()),
    );
};

const badgeClassesData = [
    {
        name: "Achievement Explorer",
        description: "Awarded for exploring all possible achievements.",
        imageUrl: "https://example.com/images/explorer.png",
        issuerId: 1,
        alignmentId: 1,
        tags: "explorer,achievements",
        startedDate: new Date(), // Current date
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ), // Random date in the next year
    },
    {
        name: "Coding Champion",
        description: "Given to those who excel in coding challenges.",
        imageUrl: "https://example.com/images/coding-champion.png",
        issuerId: 2,
        alignmentId: 2,
        tags: "coding,champion",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Bug Hunter",
        description: "For identifying and fixing critical bugs.",
        imageUrl: "https://example.com/images/bug-hunter.png",
        issuerId: 3,
        alignmentId: 3,
        tags: "bug,hunter,fix",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Design Guru",
        description: "Awarded for excellence in UI/UX design.",
        imageUrl: "https://example.com/images/design-guru.png",
        issuerId: 4,
        alignmentId: 4,
        tags: "design,guru",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Data Scientist",
        description: "For those who excel in data science projects.",
        imageUrl: "https://example.com/images/data-scientist.png",
        issuerId: 6,
        alignmentId: 6,
        tags: "data,science,projects",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Security Expert",
        description: "Awarded for expertise in cybersecurity.",
        imageUrl: "https://example.com/images/security-expert.png",
        issuerId: 7,
        alignmentId: 7,
        tags: "security,expert",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Full Stack Developer",
        description: "Given to those who excel in both front-end and back-end development.",
        imageUrl: "https://example.com/images/full-stack.png",
        issuerId: 8,
        alignmentId: 8,
        tags: "developer,full-stack",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "Cloud Architect",
        description: "For expertise in designing scalable cloud architectures.",
        imageUrl: "https://example.com/images/cloud-architect.png",
        issuerId: 9,
        alignmentId: 9,
        tags: "cloud,architecture",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
    {
        name: "DevOps Specialist",
        description: "Awarded for expertise in DevOps practices.",
        imageUrl: "https://example.com/images/devops-specialist.png",
        issuerId: 10,
        alignmentId: 10,
        tags: "devops,automation",
        startedDate: new Date(),
        expiredDate: getRandomFutureDate(
            new Date(),
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        ),
    },
];

// Insert data into the database
insertData(BadgeClasses, badgeClassesData, { validate: true, returning: false });
