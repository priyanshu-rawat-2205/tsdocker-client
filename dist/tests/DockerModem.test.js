"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modem_1 = require("../api/modem");
describe("DockerModem", () => {
    it("should construct the correct baseURL", () => {
        const modem = new modem_1.DockerModem({ host: "localhost", port: 2375 });
        expect(modem).toBeDefined();
    });
});
