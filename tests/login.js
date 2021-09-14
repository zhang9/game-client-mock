const accountApis = require("../src/apis/account");
const loginApis = require("../src/apis/login");
const { send } = require("../src/utils/ws");
const base = require("./base");

beforeAll(() => {
    return base.connect();
});
afterAll(() => {
    return base.close();
});

let username = (Math.random() + 1).toString(36).substring(2),
    token;

test("test unregistered user login account", async () => {
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
test("test unregistered user login game", async () => {
    const res = await loginApis.verifyToken(token);
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            time: expect.any(Number),
            version: expect.any(Number),
            token: expect.any(String),
            userName: expect.any(String)
        })
    );
    expect(res.r).toBe(1);
    expect(res.userName).toBe(username);
});

test("test unregistered user create character", async () => {
    const res = await send("create_character", { name: username, avatar: "0" });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100", async () => {
    const guideId = "[100]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100 fight", async () => {
    const res = await send("pve_fight", { cannon: false })
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            success: expect.any(Boolean),
            pve: expect.any(Object),
            items: expect.any(Array)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100,105", async () => {
    const guideId = "[100,105]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105 fight", async () => {
    const res = await send("pve_fight", { underlingid: "1" })
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            success: expect.any(Boolean),
            pve: expect.any(Object)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100,105,110", async () => {
    const guideId = "[100,105,110]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110 fight", async () => {
    const res = await send("pve_fight", { underlingid: "2" })
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            success: expect.any(Boolean),
            pve: expect.any(Object),
            items: expect.any(Array)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100,105,110,115", async () => {
    const guideId = "[100,105,110,115]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});

test("test novice guidance 100,105,110,115,120 upgrade underling level", async () => {
    const res = await send("underling_upgrade_level", { id: "1" })
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            level: expect.any(Number),
            exp: expect.any(Number),
            items: expect.any(Array)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100,105,110,115,120", async () => {
    const guideId = "[100,105,110,120]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});

test("test novice guidance 100,105,110,115,125 upgrade underling level", async () => {
    const res = await send("underling_upgrade_level", { id: "1" })
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            level: expect.any(Number),
            exp: expect.any(Number),
            items: expect.any(Array)
        })
    );
    expect(res.r).toBe(0);
});

test("test novice guidance 100,105,110,115,120,125", async () => {
    const guideId = "[100,105,110,120,125]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,130", async () => {
    const guideId = "[100,105,110,120,125,130]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,135 office product1", async () => {
    const res = await send("office_product", { id: "1" });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            items: expect.any(Array),
            product: expect.any(Object)
        })
    );
    expect(res.r).toBe(0);
});
test("test novice guidance 100,105,110,115,120,125,135", async () => {
    const guideId = "[100,105,110,120,125,130,135]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});

test("test novice guidance 100,105,110,115,120,125,135,140 office product2", async () => {
    const res = await send("office_product", { id: "2" });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            items: expect.any(Array),
            product: expect.any(Object)
        })
    );
    expect(res.r).toBe(0);
});
test("test novice guidance 100,105,110,115,120,125,135,140", async () => {
    const guideId = "[100,105,110,120,125,130,135,140]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});

test("test novice guidance 100,105,110,115,120,125,135,140,145 office product3", async () => {
    const res = await send("office_product", { id: "3" });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            items: expect.any(Array),
            product: expect.any(Object)
        })
    );
    expect(res.r).toBe(0);
});
test("test novice guidance 100,105,110,115,120,125,135,140,145", async () => {
    const guideId = "[100,105,110,120,125,130,135,140,145]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,135,140,145,150", async () => {
    const guideId = "[100,105,110,120,125,130,135,140,145,150]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,135,140,145,150,155", async () => {
    const guideId = "[100,105,110,120,125,130,135,140,145,150,155]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,135,140,145,150,155,157", async () => {
    const guideId = "[100,105,110,120,125,130,135,140,145,150,155,157]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
test("test novice guidance 100,105,110,115,120,125,135,140,145,150,155,157,115", async () => {
    const guideId = "[100,105,110,120,125,130,135,140,145,150,155,157,115]";
    const res = await send("pve_sync_guide", { id: guideId });
    expect(res).toEqual(
        expect.objectContaining({
            r: expect.any(Number),
            guide: expect.any(String)
        })
    );
    expect(res.r).toBe(0);
    expect(res.guide).toBe(guideId);
});
