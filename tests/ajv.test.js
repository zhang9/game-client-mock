const accountApis = require("../src/apis/account");
const loginApis = require("../src/apis/login");
const base = require("./base");
const validate = require("../src/utils/json-schema-validator");
const verifyTokenJsonSchema = require("./response/verify-token.json");

beforeAll(() => {
    return base.connect();
});
afterAll(() => {
    return base.close();
});

let username = (Math.random() + 1).toString(36).substring(2),
    token;

test("test ajv user login account", async () => {
    const res = await accountApis.login({ username: username, serverId: 1 });
    expect(res).toEqual(
        expect.objectContaining({
            token: expect.any(String),
            server: expect.any(Object),
            timezone: expect.any(Number)
        })
    );
    token = res.token;
});
test("test exist user login game", async () => {
    const res = await loginApis.verifyToken(token);
    const valid = validate(verifyTokenJsonSchema, res);
    expect(valid).toBe(true);
});
