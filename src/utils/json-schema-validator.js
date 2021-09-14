const Ajv = require("ajv");
const ajv = new Ajv();

module.exports = function validate(jsonSchema, data) {
    const validate = ajv.compile(jsonSchema);
    const valid = validate(data);
    if(!valid) {
        console.log("validate failed:", validate.errors);
    }
    return valid;
}