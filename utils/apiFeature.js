const { Op } = require("sequelize");

/**
 *
 * @param queryString : take operation from endpoint and apply by output
 * @class ApiFeature
 */
class ApiFeature {
    constructor(queryString, model) {
        this.query = {};
        this.queryString = queryString;
        this.model = model;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "page", "search"];
        excludedFields.forEach((el) => delete queryObj[el]);

        const filters = {};
        Object.keys(queryObj).forEach((field) => {
            if (typeof queryObj[field] === "object") {
                for (const op in queryObj[field]) {
                    const value = queryObj[field][op];
                    if (op === "gte") filters[field] = { [Op.gte]: value };
                    else if (op === "gt") filters[field] = { [Op.gt]: value };
                    else if (op === "lte") filters[field] = { [Op.lte]: value };
                    else if (op === "lt") filters[field] = { [Op.lt]: value };
                }
            } else {
                filters[field] = queryObj[field];
            }
        });

        // Apply search logic only if the search query is present and fields exist in the model
        if (this.queryString.search) {
            const searchConditions = [];

            if (this.model.rawAttributes.name) {
                searchConditions.push({ name: { [Op.like]: `%${this.queryString.search}%` } });
            }

            if (this.model.rawAttributes.institutionName) {
                searchConditions.push({
                    institutionName: { [Op.like]: `%${this.queryString.search}%` },
                });
            }

            if (searchConditions.length > 0) {
                filters[Op.or] = searchConditions;
            }
        }

        this.query.where = filters;
        return this;
    }

    // sorting() {
    //     if (this.queryString.sort) {
    //         const sortBy = this.queryString.sort.split(",").map((el) => {
    //             let field = el.startsWith("-") ? el.slice(1) : el;
    //             const order = el.startsWith("-") ? "DESC" : "ASC";

    //             // Check if the field exists in rawAttributes
    //             if (this.model.rawAttributes[field]) {
    //                 // Return valid field and order
    //                 return [field, order];
    //             }
    //             return null;
    //         }).filter(Boolean);

    //         this.query.order = sortBy.length ? sortBy : [["institutionName", "DESC"]];
    //     } else {
    //         this.query.order = [["institutionName", "DESC"]];
    //     }

    //     return this;
    // }

    sorting() {
        // Determine the default sorting field based on the query string or a parameter
        const defaultSortField = "name" || "institutionName" || "inviteEmail";

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort
                .split(",")
                .map((el) => {
                    let field = el.startsWith("-") ? el.slice(1) : el;
                    const order = el.startsWith("-") ? "DESC" : "ASC";

                    // Check if the field exists in rawAttributes
                    if (this.model.rawAttributes[field]) {
                        // Return valid field and order
                        return [field, order];
                    }
                    return null;
                })
                .filter(Boolean);

            // If no valid sort fields provided, fall back to the dynamic default sort field
            this.query.order = sortBy.length ? sortBy : [[defaultSortField, "DESC"]];
        } else {
            // If no sort is specified, fall back to the dynamic default sort field
            this.query.order = [[defaultSortField, "DESC"]];
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
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
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
