import store from "../store";

const c2sArray = require("../assets/c2s.json");
const s2cArray = require("../assets/s2c.json");
const sproto = require("./sproto.js");

const s2c = sproto.createNew(new Uint8Array(s2cArray)),
    c2s = sproto.createNew(new Uint8Array(c2sArray));

const clientHost = s2c.host();

const clientSender = clientHost.attach(c2s);

export { clientHost, clientSender };

export default clientSender;
