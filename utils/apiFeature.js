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
    
        // Remove excluded fields from the query object
        excludeFields.forEach((el) => delete queryObj[el]);
    
        // Transform query object into Sequelize-compatible format
        Object.keys(queryObj).forEach((key) => {
            const value = queryObj[key];
    
            // Match query keys with operators using regex
            const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/); // Match keys like duration[gte], price[lt], etc.
            if (match) {
                const fieldName = match[1]; // e.g., duration
                const operator = match[2]; // e.g., gte
    
                // Ensure value is converted to a number if it's numeric
                const numericValue = parseFloat(value); // Use parseFloat to handle decimal numbers
    
                // Initialize field if not already present
                if (!queryObj[fieldName]) {
                    queryObj[fieldName] = {};
                }
    
                // Map operators to Sequelize's Op and use match group for the operation
                const operatorMapping = {
                    gte: Op.gte,
                    gt: Op.gt,
                    lte: Op.lte,
                    lt: Op.lt,
                };
    
                queryObj[fieldName][operatorMapping[operator]] = numericValue;
    
                // Remove the original key with brackets (e.g., duration[gte])
                delete queryObj[key];
            } else if (typeof value === "string" && value.includes(",")) {
                // Handle conditions with multiple values (e.g., id=1,2,3)
                queryObj[key] = { [Op.in]: value.split(",").map(Number) }; // Convert to numbers
            } else {
                // Handle case where value is not a string
                queryObj[key] = value;
            }
        });
    
        // Set the query's where clause if the query object is not empty
        if (Object.keys(queryObj).length > 0) {
            this.query = {
                where: queryObj,
            };
        } else {
            this.query = {};
        }
    
        return this;
    }
    
    

    // method to sort the output
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").map((el) => [el, "DESC"]);
            this.query.order = sortBy;
        } else {
            this.query.order = [["id", "ASC"]];
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
        const limit = this.queryString.limit * 1 || 100;
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
