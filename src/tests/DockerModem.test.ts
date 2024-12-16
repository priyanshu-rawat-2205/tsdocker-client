import { DockerModem } from "../modem";

describe("DockerModem", () => {
    it("should construct the correct baseURL", () => {
        const modem = new DockerModem({host: "localhost", port:2375});
        expect(modem).toBeDefined();
    });
});