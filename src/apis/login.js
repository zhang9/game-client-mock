import { send } from "../utils/ws";

export const verifyToken = token => {
    return send("verify_token", { token });
};
