const { Op } = require("sequelize");


/**
 *
 * @param queryString : take operation from endpoint and apply by output 
 * @class ApiFeature
 */
class ApiFeature {
    constructor(queryString, model) {
        this.query = {}; // Start with an empty query object
        this.queryString = queryString; // Holds req.query
        this.model = model; // The Sequelize model to query
    }

    // Filtering logic
    filtering() {
        const queryObj = { ...this.queryString }; // req.query is passed as queryString
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        // Advanced filtering
        const filters = {};

        // Loop through each query object key and handle Sequelize operators
        Object.keys(queryObj).forEach((field) => {
            if (typeof queryObj[field] === "object") {
                // Handle nested objects like duration[gt]
                for (const op in queryObj[field]) {
                    const value = queryObj[field][op];

                    // Map query string operators (gte, gt, lte, lt) to Sequelize operators
                    if (op === "gte") {
                        filters[field] = { [Op.gte]: value };
                    } else if (op === "gt") {
                        filters[field] = { [Op.gt]: value };
                    } else if (op === "lte") {
                        filters[field] = { [Op.lte]: value };
                    } else if (op === "lt") {
                        filters[field] = { [Op.lt]: value };
                    }
                }
            } else {
                // Direct assignment for non-object fields
                filters[field] = queryObj[field];
            }
        });

        // Apply filters in Sequelize query
        this.query.where = filters;

        return this;
    }

    // Sorting logic
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").map((el) => {
                let field = el;
                let order = "ASC";
                if (el.startsWith("-")) {
                    field = el.slice(1);
                    order = "DESC";
                }
                return [field, order];
            });
            this.query.order = sortBy;
        } else {
            this.query.order = [["id", "ASC"]];
        }
        return this;
    }

    // Field limiting logic
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",");
            this.query.attributes = fields;
        }
        return this;
    }

    // Pagination logic
    pagination() {
        const page = this.queryString.page * 1 || 1; // Default to page 1
        const limit = this.queryString.limit * 1 || 100; // Default limit to 100
        const offset = (page - 1) * limit;

        this.query.limit = limit;
        this.query.offset = offset;

        return this;
    }

    // Execute the query and return results
    async execute(options = {}) {
        return await this.model.findAll({ ...this.query, ...options });
    }
}

module.exports = ApiFeature;
