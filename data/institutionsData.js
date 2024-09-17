const { Institutions } = require("../models");
const insertData = require("./insertData");

const institutions = [
    {
        userId: 101,
        name: 'Tech Innovations Inc.',
        bio: 'A leading institution in technology and innovation, dedicated to fostering creativity and entrepreneurship.',
        email: 'info@techinnovationss.com',
        phoneNumber: '1234567890',
        websiteUrl: 'https://www.techinnovations.com',
        profileImage: 'https://www.techinnovations.com/images/profile.jpg',
    },
    {
        userId: 102,
        name: 'Health & Wellness Center',
        bio: 'Committed to improving health and wellness through education and community support.',
        email: 'contact@healthwellnesss.org',
        phoneNumber: '0987654321',
        websiteUrl: 'https://www.healthwellness.org',
        profileImage: null,
    },
    {
        userId: 103,
        name: 'Creative Arts Academy',
        bio: 'An institution that nurtures artistic talent and promotes creative expression among students.',
        email: 'admissions@creativeartsacademys.com',
        phoneNumber: '5551234567',
        websiteUrl: 'https://www.creativeartsacademy.com',
        profileImage: null,
    }
]

insertData(Institutions, institutions, {validate: false})
