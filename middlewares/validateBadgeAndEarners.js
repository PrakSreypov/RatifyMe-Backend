const BadgeClass = require("../models/BadgeClasses");
const Earner = require("../models/Earners");

// Middleware to validate badge and earners
const validateBadgeAndEarners = async (req, res, next) => {
    const { badgeClassId } = req.params;
    const { earnerIds } = req.body;

    // Check if badgeClass exists
    const badgeClass = await BadgeClass.findByPk(badgeClassId);
    if (!badgeClass) {
        return res.status(404).json({ message: "BadgeClass not found" });
    }

    // Check if earnerIds are provided and valid
    if (!earnerIds || !Array.isArray(earnerIds)) {
        return res.status(400).json({ message: "earnerIds must be an array" });
    }

    // Validate if all earnerIds exist
    const earners = await Earner.findAll({ where: { id: earnerIds } });
    if (earners.length !== earnerIds.length) {
        return res.status(404).json({ message: "Some earners not found" });
    }

    // Pass data to the next middleware/controller
    req.badgeClass = badgeClass;
    req.earners = earners;
    next();
};

module.exports = validateBadgeAndEarners;
