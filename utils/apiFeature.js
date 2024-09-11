const { Op } = require("sequelize");

class ApiFeature {
    constructor(query, queryString, model) {
        this.query = query;
        this.queryString = queryString;
        this.model = model;
    }

    // method to filter the result exclude sort, page, limit, and fields params
    filtering() {
        const queryObj = { ...this.queryString };
        const excludeFields = ["sort", "page", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        Object.keys(queryObj).forEach((key) => {
            if (queryObj[key].includes(",")) {
                queryObj[key] = { [Op.in]: queryObj[key].split(",") }; // Handle conditions with multiple values (e.g., id=1,2,3)
            }
            // Replace comparison operators with Sequelize's Op
            if (queryObj[key].startsWith("gte")) {
                queryObj[key] = { [Op.gte]: queryObj[key].substring(4) };
            } else if (queryObj[key].startsWith("gt")) {
                queryObj[key] = { [Op.gt]: queryObj[key].substring(3) };
            } else if (queryObj[key].startsWith("lte")) {
                queryObj[key] = { [Op.lte]: queryObj[key].substring(4) };
            } else if (queryObj[key].startsWith("lt")) {
                queryObj[key] = { [Op.lt]: queryObj[key].substring(3) };
            }
        });

        this.query = {
            where: queryObj,
        };

        return this;
    }

    // method to sort the output
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").map((el) => [el, "ASC"]);
            this.query.order = sortBy;
        } else {
            this.query.order = [["id", "DESC"]];
        }
        return this;
    }

    // method to select specific fields for output
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",");
            this.query.attributes = fields;
        }

        return this;
    }

    // method to handle pagination (offset)
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const offset = (page - 1) * limit;

        this.query.limit = limit;
        this.query.offset = offset;

        return this;
    }

    async execute(options = {}) {
        // Merge the query (where, attributes, etc.) with other options like include
        return await this.model.findAll({ ...this.query, ...options });
    }
}

module.exports = ApiFeature;
