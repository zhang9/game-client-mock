const accountApis = require("../src/apis/account");
const loginApis = require("../src/apis/login");
const base = require("./base");

beforeAll(() => {
    base.initData();
});

test("login account server", () => {
    return accountApis
        .login({ username: "tsdcwldlwer", serverId: 1 })
        .then(res => {
            expect(res).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                    server: expect.any(Object),
                    timezone: expect.any(Number)
                })
            );
            return res.token;
        })
        .then(token => {
            return loginApis.verifyToken(token);
        })
        .then(res => {
            expect(res).toEqual(
                expect.objectContaining({
                    r: expect.toBe(1)
                })
            );
        });
});
